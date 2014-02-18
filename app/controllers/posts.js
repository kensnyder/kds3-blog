"use strict";

var Post = require('../models/post');
var _ = require('lodash');

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
		res.render('posts/addedit.html', {is_new:true});
	},
	// process new post (admin)
	"POST /admin/posts/add": function(req, res) {
		new Post(req.body).save().then(function(post) {
			res.redirect('/admin/posts');
		});
	},
	// edit post (admin)
	"GET /admin/posts/edit/:id": function(req, res) {
		new Post({id: req.params.id}).fetch({
			withRelated: ['tags']
		}).then(function(post) {
			if (post) {
				res.render('posts/addedit.html', _.extend(post.toJSON(), req.body));
			}
			else {
				res.render('errors/404.html');
			}
		});
	},
	// process edited post (admin)
	"POST /admin/posts/edit/:id": function(req, res) {
		new Post({id: req.params.id})
			.save(req.body, {patch:true})
			.then(function(post) {
				if (post && req.body.save_and_return) {
					req.redirect('/admin/posts');
				}
				else if (post) {
					res.render('posts/addedit.html', req.body);
				}
				else {
					// errored
					res.redirect('/admin/posts/edit/' + req.params.id);
				}
			})
		;
	},
	// delete post (admin)
	"POST /admin/posts/delete/:id": function(req, res) {

	},
	// list of posts for admin page (admin)
	"GET /admin/posts": function(req, res) {
		var page = (parseFloat(req.query.page) || 1); 
		Post.getListing(page, function(data) {
			res.render('posts/admin_listing.html', data);
		});
	}

};

module.exports = PostsController;