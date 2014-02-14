"use strict";

var Bookshelf = require('./pg');
var Comments = require('./comments');
var Tags = require('./tags');

var Post = Bookshelf.Model.extend({
	tableName: 'posts',
	comments: function() {
		return this.hasMany(Comments);
	},
	tags: function() {
		return this.belongsToMany(Tags);
	}
});

module.exports = Post;