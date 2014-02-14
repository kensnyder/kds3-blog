var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  var query = client.query('SELECT * FROM posts');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});