"use strict";

var Bookshelf = require('./pg');
var Comment = Bookshelf.Model.extend({
	tableName: 'comments'
});

module.exports = Comment;