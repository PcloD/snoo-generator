let image_path = '120x40_v2/'
let n_images = 860;

let image_container = document.querySelector('#image-container');
let color = document.querySelector('#color');
let number = document.querySelector('#number');
let logo_preset = document.querySelector('#logo-preset');
let text_preset = document.querySelector('#text-preset');

function random(a, b) {
	return Math.floor(Math.random() * (b - a + 1) + a);
}

function loadImage(src, callback) {
	var newImg = new Image;
	newImg.onload = callback;
	newImg.src = src;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

let _run_count = 0;
function generate() {
	let _this_run_count = _run_count;
	
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	
	canvas.width = 120;
	canvas.height = 40;
	
	if (color.value === 'inverted') {
		document.body.classList.add('inverted');
		ctx.filter = "invert(100%) hue-rotate(180deg)"
	} else {
		document.body.classList.remove('inverted');
	}
	
	
	let loading = 0;
	function randomImage(x, y, w, h, filename) {
		let file_path = image_path + pad(random(0, n_images-1), 4) + '.png';
		if(filename) file_path = image_path + filename;
		
		loading++;
		loadImage(file_path, function() {
			if (_this_run_count !== _run_count) return;
			
			ctx.drawImage(this, x, y, w, h, x, y, w, h);
		
			loading--;
			if (loading === 0) {
				let container = document.createElement('div');
				container.classList.add('generated-item');
				
				let dataURL = canvas.toDataURL();
				
				let output_image = new Image();
				output_image.src = dataURL;
				container.appendChild(output_image);
				
				let download = document.createElement('a');
				download.textContent = 'download';
				download.href = dataURL;
				download.download = 'snoo.png';
				container.appendChild(download);
				
				image_container.appendChild(container);
			}
		})
	}
	
	let w, h;
	if(logo_preset.value === 'grid' || logo_preset.value === 'lines') {
		w = 17;
		h = 9;
		if(logo_preset.value === 'lines') { h = 2; }
		
		for (let x = 0; x < 34; x += w) {
			for (let y = 0; y < 40; y += h) {
				randomImage(x, y, w, h)
			}
		}
	} else if (logo_preset.value === 'default') {
		randomImage(0, 0, 34, 40, '0131.png')
	}
	
	
	randomImage(34, 0, 86, 40, '0131.png')
	
	if(text_preset.value === 'grid' || text_preset.value === 'lines' || text_preset.value === 'glitchy_grid') {
		w = 17;
		h = 9;
		if(text_preset.value === 'lines') { h = 2; }
		for (let x = 34; x < 120; x += w) {
			for (let y = 0; y < 40; y += h) {
				randomImage(x, y, w, h)
			}
		}
	}
	
	if(text_preset.value === 'glitchy' || text_preset.value === 'glitchy_grid' || text_preset.value === 'extreme') {
		let chaos = random(10, 40);
		let ultrachaos = false//(random(1, 5) == 1);
		if (text_preset.value === 'extreme') ultrachaos = true;
		
		for (let i = 0; i < chaos; i ++) {
			let x = random(34, 120);
			let y = random(10, 40);
			if (ultrachaos) {
				randomImage(x, y, random(40, 120), random(10, 40))
			} else {
				randomImage(x, y, random(1, 40), random(1, 8));
			}
		}
	}
}

function run() {
	_run_count++;
	image_container.innerHTML = '';
	
	let n = Number(number.value);
	for(let i = 0; i < n; i++) generate();

}

run();