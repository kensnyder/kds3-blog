"use strict";

//var Posts = require('postifysomethingorother');

var PostsController = {

	// list of posts, sticky posts
	"GET /": function(req, res) {
		res.send('Welcome to my blog');
	},
	// add post (admin)
	"GET /posts/add": function(req, res) {

	},
	// process new post (admin)
	"POST /posts/add": function(req, res) {

	},
	// edit post (admin)
	"GET /posts/edit/:id": function(req, res) {

	},
	// process edited post (admin)
	"POST /posts/edit/:id": function(req, res) {

	},
	// delete post (admin)
	"POST /posts/delete/:id": function(req, res) {

	},
	// view post
	"GET /posts/:slug": function(req, res) {

	},
	// list of posts for admin page (admin)
	"GET /posts/admin": function(req, res) {

	},
	// import data from drupal (admin)
	"GET /posts/import": function(req, res) {

	}

};

module.exports = PostsController;