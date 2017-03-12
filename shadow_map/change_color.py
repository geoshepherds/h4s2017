# CHANGE COLOUR

from PIL import Image, ImageColor, ImageDraw
import pdb
from os import path

im = Image.open("shadow_map/rendered/2016-06-21.png")
newIm = im.copy()

for y in xrange(0, newIm.size[0]):
    for x in xrange(0, newIm.size[0]):
        rgba = newIm.getpixel((y, x))
        newIm.putpixel((y, x), (0,97,1, rgba[3]))


draw = ImageDraw.ImageDraw(newIm)

newIm.save('shadow_map/rendered/2016-06-21-green.png')
