#!/usr/bin/python

from datetime import datetime, timedelta
from heightmap import HeightMap
from suncalc import solar_position
from shadowmap import ShadowMap, get_projection_north_deviation
from math import sin, cos
from os import path
import numpy
# from pyproj import Proj
import csv
from PIL import Image, ImageOps, ImageDraw, ImageFilter
import argparse
import pdb
import decimal

parser = argparse.ArgumentParser()
parser.add_argument('heightmap', type=str, help='Path to heightmap file')
parser.add_argument('start', type=str, help='Start date and time (YYYY-MM-DD HH:MM)')
parser.add_argument('end', type=str, help='End date and time (YYYY-MM-DD HH:MM)')
parser.add_argument('interval', type=int, help='Interval between images in minutes')
parser.add_argument('output_directory', type=str, help='Path to store images in')
parser.add_argument('--background-map', type=str, default=None, help='Path to background map image')
parser.add_argument('--opacity', type=float, default=1, help='Opacity for shadow when overlaid (0-1)')

args = parser.parse_args()

with open(args.heightmap, 'rb') as f:
    hm = HeightMap.load(f)


t1 = datetime.strptime(args.start, '%Y-%m-%d %H:%M')
t2 = datetime.strptime(args.end, '%Y-%m-%d %H:%M')

delta = timedelta(minutes=args.interval)

bkg = None
if args.background_map:
    bkg = Image.open(args.background_map).convert('RGB')
    transparency = int(255 - args.opacity * 255)


acc_map = numpy.zeros((hm.size, hm.size), dtype=int)

def shadow_accumulation(shadow_map):
    for y in xrange(0, hm.size):
        for x in xrange(0, hm.size):
            acc_map[(y, x)] = acc_map[(y, x)] + shadow_map[(y, x)]

    return acc_map


t = t1
while t <= t2:
    print t.strftime('%Y-%m-%d_%H%M.png'), '...'
    sunpos = solar_position(t, hm.lat, hm.lng)
    dev = get_projection_north_deviation(hm.proj, hm.lat, hm.lng)
    sun_x = -sin(sunpos['azimuth'] - dev) * cos(sunpos['altitude'])
    sun_y = -cos(sunpos['azimuth'] - dev) * cos(sunpos['altitude'])
    sun_z = sin(sunpos['altitude'])

    sm = ShadowMap(hm.lat, hm.lng, hm.resolution, hm.size, hm.proj, sun_x, sun_y, sun_z, hm, 1.5)
    array_map = sm.compute_shadow()
    shadow_total = shadow_accumulation(array_map)

    t += delta
    print

img = Image.new("RGBA", (hm.size, hm.size))
alpha_scaled = (200.0 / acc_map.max() * (acc_map - acc_map.min())).astype(numpy.uint8)

for y in xrange(0, hm.size):
    for x in xrange(0, hm.size):
        img.putpixel((y, x), (0,82,147, alpha_scaled[(y,x)]))

blurfilter = ImageFilter.GaussianBlur()
blurfilter.radius=3
blurred_img = img.filter(blurfilter)
rotated_img = blurred_img.rotate(90)
# rotated_img = blurred_img.transpose(Image.FLIP_TOP_BOTTOM)
draw = ImageDraw.ImageDraw(rotated_img)

rotated_img.save(path.join(args.output_directory, t.strftime('%Y-%m-%d.png')))
