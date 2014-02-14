"use strict";

module.exports = require('bookshelf').initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'ksnyder',
    password : '',
    database : 'ksnyder',
    charset  : 'utf8'
  }
});
