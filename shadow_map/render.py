#!/usr/bin/python

from datetime import datetime, timedelta
from heightmap import HeightMap
from suncalc import solar_position
from shadowmap import ShadowMap, get_projection_north_deviation
from math import sin, cos
from os import path
import numpy
from PIL import Image, ImageChops, ImageDraw
import argparse
import pdb

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


    # img = sm.to_image()
    # img = img.convert('RGB')
    #
    # if bkg:
    #     img = Image.eval(img, lambda x: x + transparency)
    #     img = ImageChops.multiply(img, bkg)
    #
    # draw = ImageDraw.ImageDraw(img)
    # text = t.strftime('%Y-%m-%d %H:%M')
    # txtsize = draw.textsize(text)
    # draw.text((hm.size - txtsize[0] - 5, hm.size - txtsize[1] - 5), text, (0,0,0))
    #
    # img.save(path.join(args.output_directory, t.strftime('%Y-%m-%d_%H%M.png')))

    t += delta
    print

img = sm.to_image()
img = img.convert('RGB')

if bkg:
    img = Image.eval(img, lambda x: x + transparency)
    img = ImageChops.multiply(img, bkg)

draw = ImageDraw.ImageDraw(img)
text = t.strftime('%Y-%m-%d %H:%M')
txtsize = draw.textsize(text)
draw.text((hm.size - txtsize[0] - 5, hm.size - txtsize[1] - 5), text, (0,0,0))

img.save(path.join(args.output_directory, t.strftime('%Y-%m-%d_%H%M.png')))
