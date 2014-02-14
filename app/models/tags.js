"use strict";

var Bookshelf = require('./pg');
var Tags = Bookshelf.Model.extend({
	tableName: 'tags'
});

module.exports = Tags;