from PIL import Image
import os
import pdb


def evaluate_pixels(arg):
    check = arg


fpath = os.path.abspath('shadow_map/rendered/2014-06-25_1300.png')
im = Image.open(fpath)
