"use strict";

var Bookshelf = require('./pg');
var Comments = require('./comments');
var Tags = require('./tags');

var Post = Bookshelf.Model.extend({
	tableName: 'posts',
	hasTimestamps: ['created'],
	comments: function() {
		return this.hasMany(Comments);
	},
	tags: function() {
		return this.belongsToMany(Tags);
	}
});
Post.getListing = function(page, callback) {
	Post.collection().query(function(query) {
		query
			.orderBy('is_sticky', 'DESC')
			.orderBy('created', 'DESC')
			.limit(10)
			.offset((page-1) * 10)
		;
	}).fetch().then(function(posts) {
		posts = posts.map(function(post) {
			post = post.toJSON();
			var halves = post.html.split('<p>SPLIT</p>');
			post.summary = halves[0];
			post.html = halves[0] + halves[1] || '';
			return post;
		});
		Bookshelf.knex('posts').count('*').then(function(result) {
			callback({
				posts: posts,
				page: page,
				count: result[0].count
			});
		});
	});
};

module.exports = Post;