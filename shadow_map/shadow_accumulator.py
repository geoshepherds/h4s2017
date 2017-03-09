from PIL import Image
import os
import pdb


def evaluate_pixels(arg):
    pdb.set_trace()
    check = arg


fpath = os.path.abspath('shadow_map/rendered/2014-06-25_1300.png')
im = Image.open(fpath)

Image.eval(im, lambda x: pdb.set_trace())
