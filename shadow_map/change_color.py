# CHANGE COLOUR

from PIL import Image, ImageColor, ImageDraw
import pdb
from os import path

im = Image.open("shadow_map/rendered/sthlm_buildings.png")
newIm = im.copy()
rgbImg = newIm.convert("RGB")

for y in xrange(0, newIm.size[0]):
    for x in xrange(0, newIm.size[1]):
        # rgba = rgbImg.getpixel((y,x))
        # pdb.set_trace()
        rgbImg.putpixel((y, x), (255,0,255))


draw = ImageDraw.ImageDraw(rgbImg)

rgbImg.save('shadow_map/rendered/sthlm_buildingsRgb.png')
