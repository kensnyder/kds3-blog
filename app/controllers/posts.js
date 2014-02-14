"use strict";

var Post = require('../models/post');
// var _ = require('underscore');

var PostsController = {
	beforeFilter: function(req, res, next) {
		// if (req.route.path.match(/^\/admin/) && !loggedIn) {
		// 	res.render('errors/403.html');
		// }
		next();
	},
	// list of posts, sticky posts
	"GET /": function(req, res) {
		var page = 1;
		Post.getListing(page, function(data) {
			res.render('posts/listing.html', data);
		});
	},
	// get more pages node?page=#
	"GET /node": function(req, res) {
		var page = (parseFloat(req.query.page) || 1);
		Post.getListing(page, function(data) {
			res.render('posts/listing.html', data);
		});
	},	
	// view post
	"GET /posts/:slug": function(req, res) {
		new Post({slug: req.params.slug}).fetch({
			withRelated: ['comments','tags']
		}).then(function(post) {
			if (post) {
				res.render('posts/detail.html', post.toJSON());
			}
			else {
				res.render('errors/404.html');
			}
		});
	},
	// add post (admin)
	"GET /admin/posts/add": function(req, res) {
		res.render('posts/add.html', req.body);
	},
	// process new post (admin)
	"POST /admin/posts/add": function(req, res) {

	},
	// edit post (admin)
	"GET /admin/posts/edit/:id": function(req, res) {

	},
	// process edited post (admin)
	"POST /admin/posts/edit/:id": function(req, res) {

	},
	// delete post (admin)
	"POST /admin/posts/delete/:id": function(req, res) {

	},
	// list of posts for admin page (admin)
	"GET /admin/posts/admin": function(req, res) {
		var page = (parseFloat(req.query.page) || 1); 
		Post.getListing(page, function(data) {
			res.render('posts/admin_listing.html', data);
		});
	}

};

module.exports = PostsController;