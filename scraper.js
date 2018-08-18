const Crawler = require("crawler");
const download = require('image-downloader');
const fs = require('fs');

var data = {};

var url_array = [];

fs.readFileSync('allsubreddits.txt', 'utf8').split('\n').forEach(function(line) {
	if (line.trim() == '') return;
	
	let [subscribers, name, nsfw] = line.split(',');
	
	subscribers = Number(subscribers);
	nsfw = nsfw.indexOf('true') !== -1 ? true : false;
	
	if (subscribers < 1000) return;
	
	data[name] = { subscribers, nsfw }
	if (!nsfw) {
		url_array.push('https://old.reddit.com/r/' + name)
	}
});

var c = new Crawler({
    maxConnections : 100,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            let $ = res.$;

            let src = $('#header-img[width="120"][height="40"]:not(.default-header)').attr('src');
            
            if (src != undefined) {
            	download.image({
            		url: 'https:' + src,
            		dest: 'scraped_images2/'
            	});
            }
        }
        done();
    }
});

c.queue(url_array)