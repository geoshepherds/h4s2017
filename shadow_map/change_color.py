# CHANGE COLOUR

from PIL import Image, ImageColor, ImageDraw
import pdb
from os import path

im = Image.open("resources/sthlm_rgb.png")
newIm = im.copy()

for y in xrange(0, newIm.size[0]):
    for x in xrange(0, newIm.size[0]):
        rgba = newIm.getpixel((y, x))
        newIm.putpixel((y, x), (255,255,255,255))


draw = ImageDraw.ImageDraw(newIm)

newIm.save('resources/sthlm_buildings.png')
