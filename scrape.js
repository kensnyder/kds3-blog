"use strict";

var request = require('request');
var xmldom = require('xmldom');
var DOMParser = xmldom.DOMParser;
var XMLSerializer = xmldom.XMLSerializer;
var parser = new DOMParser();
var ser = new XMLSerializer();
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var tidy = require('htmltidy').tidy;
var tidyopts = {
    doctype: 'html5',
    hideComments: true,
    indent: false
};

var slugs = require('./slugs');
var postUrls = {};
var aliases = {};

slugs.forEach(function(slug) {
	if (slug.slug.match(/^posts/)) {
		postUrls[slug.nid] = slug.slug;
		fetchPost(slug);
	}
	else {
		aliases[slug.slug] = slug.nid;
	}
});
var nid;
for (var slug in aliases) {
	nid = aliases[slug];
	if (postUrls[nid]) {
		aliases[slug] = postUrls[nid];
	}
}
var json = JSON.stringify(aliases);
fs.writeFile("./imports/aliases2.json", beautify(json), function(err) {
	if (err) {
		console.log('ERROR writing aliases.json');
	}
	else {
		console.log('SUCCESS writing aliases.json (' + json.length + ' bytes)');	
	}
});

function fetchPost(slug) {
	request('http://kendsnyder.com/' + slug.slug, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			tidy(body, tidyopts, function(err, html) {				
				var post = processBody(html);
				post.slug = slug.slug.slice(6);
				post.nid = slug.nid;
				var json = JSON.stringify(post);
				fs.writeFile("./imports/zpost-" + slug.nid + '.json', beautify(json), function(err) {
					if (err) {
						console.log('ERROR writing nid ' + slug.nid + ' at ' + slug.slug);
					}
					else {
						console.log('SUCCESS writing nid ' + slug.nid + ' (' + json.length + ' bytes)');	
					}
				});
			});
		}
		else {
			console.log('ERROR fetching nid ' + slug.nid + ' at http://kendsnyder.com/' + slug.slug + ': ' + response.statusCode + ' - Message: ' + error);
		}
	});
}

function processBody(body) {
	var document = parser.parseFromString(body, 'text/html');
	if (!document) {
		return {};
	}

    var post = {
    	comments: [],
    	tags: []
    };
    var day, month_year;
    post.title = document.getElementsByTagName('h1')[0].childNodes[0].nodeValue;

    var divs = document.getElementsByTagName('div');
    [].slice.call(divs).forEach(function(div) {
    	var className = div.getAttribute('class'); 
    	var id = div.getAttribute('id'); 
    	var match;
    	if (className.match(/^comment /)) {
    		post.comments.push(processComment(div));
    	}
    	else if (className == 'content') {
    		if (div.parentNode.getAttribute('id').match(/^node-/)) {
    			post.html = ser.serializeToString(div).replace(/^<div class="content">([\S\s]+)<\/div>$/, '$1').trim();
    		}
    	}
    	else if (className == 'month-year') {
    		month_year = div.childNodes[0].nodeValue;
    	}
    	else if (className == 'day') {
    		day = div.childNodes[0].nodeValue;
    	}
    });
    var links = document.getElementsByTagName('a');
    [].slice.call(links).forEach(function(link) {
    	var match;
    	var className = link.getAttribute('class'); 
    	if ((match = className.match(/^content-tag-(.+)/))) {
    		post.tags.push(match[1]);
    	}    	
    });
    post.timestamp = Date.parse(day + ' ' + month_year);
    return post;
}
function processComment(node) {
	var comment = {};
	var divs = node.getElementsByTagName('div');
	[].slice.call(divs).forEach(function(div) {
		var className = div.getAttribute('class'); 
		if (className == 'submitted') {
			var match = div.childNodes[0].nodeValue.trim().split('by');
			comment.timestamp = Date.parse(match[0].trim());
			comment.by = match[1] ? match[1].trim() : null;
		}
		else if (className == 'content') {
			comment.text = ser.serializeToString(div).replace(/^<div class="content">([\S\s]+)<\/div>$/, '$1').trim();
		}
	});
	comment.title = node.getElementsByTagName('h3')[0].firstChild.firstChild.nodeValue.trim();
	return comment;
}
