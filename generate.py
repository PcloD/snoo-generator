from PIL import Image
import random

from os import listdir
logos = listdir('120x40')

def random_image():
	path = '120x40/' + random.choice(logos)
	return Image.open(path)

def grid_glitch(w=20, h=10, output=None):
	if output is None:
		output = Image.new('RGBA', (120, 40))

	for x in xrange(0, 120, w):
		for y in xrange(0, 40, h):
			image = random_image()
			cropped = image.crop((x, y, x+w, y+h)) 
			output.paste(cropped, (x, y))
			image.close()
	
	return output

def random_glitch(n=20, output=None):
	if output is None:
		output = Image.new('RGBA', (120, 40))

	for i in xrange(n):
		x = random.randint(0, 120)
		y = random.randint(0, 40)
		w = random.randint(5, 80)
		h = random.randint(1, 10)
		
		image = random_image()
		cropped = image.crop((x, y, x+w, y+h)) 
		output.paste(cropped, (x, y))
		image.close()
	
	return output

for i in range(100):
	img = grid_glitch(20, 10)
	img = random_glitch(output=img)

	img.save('images/{:04d}.png'.format(i))