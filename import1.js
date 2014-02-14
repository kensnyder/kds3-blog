var pg = require('pg');
var fs = require('fs');

var tags = {
'cakephp':1
,'css':2
,'html':3
,'javascript':4
,'jquery':5
,'linux':6
,'os-x':7
,'php':8
,'prototype-js':9
,'sql':10
,'technology':11
,'web-dev':12
};

pg.connect(process.env.DATABASE_URL, function(err, client) {
	var path, post, sql, query;
	for (var i = 21; i <= 107; i++) {
		path = './imports/post-'+i+'.json';
		if (!fs.existsSync(path)) {
console.log('No file for post-' + i);
			continue;
		}
		post = JSON.parse(fs.readFileSync(path));
		if (!post || !post.html || !post.slug || !post.title || !post.timestamp) {
console.log('skipping post-' + i);
			continue;
		}
		insertPost(client, post);
	}
});

function insertPost(client, post) {
	var sql = "INSERT INTO posts (slug,title,markdown,html,created,status,is_sticky) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id";
	client.query(sql,
		[
			post.slug,
			post.title,
			'',
			post.html,
			toDate(post.timestamp),
			'published',
			0
		],
		function (err, result) {
			var post_id = result.rows[0].id;
			post.comments.forEach(function(comment) {
console.log('inserting comment for post ' + post_id);				
				insertComment(client, post_id, comment);
			});
			post.tags.forEach(function(tag) {
console.log('inserting tag ' + tag + ' for post ' + post_id);				
				insertTag(client, post_id, tag);
			});
		}
	);
}

function insertComment(client, post_id, comment) {
	var sql = "INSERT INTO comments (post_id,author,markdown,html,created) VALUES ($1,$2,$3,$4,$5)";
	client.query(sql, [
		post_id,
		comment.by,
		'',
		comment.text,
		toDate(comment.timestamp)
	]);
}

function insertTag(client, post_id, tag) {
	var sql = "INSERT INTO posts_tags (post_id,tag_id) VALUES ($1,$2)";
	client.query(sql, [
		post_id,
		tags[tag]
	]);
}

function toDate(ts) {
	var date = new Date(ts);
	return date.getFullYear() + '-' +
		zeroPad(date.getMonth()+1) + '-' +
		zeroPad(date.getDate()) + ' ' +
		zeroPad(date.getHours()) + ':' +
		zeroPad(date.getMinutes()) + ':' +
		zeroPad(date.getSeconds())
	;
}
function zeroPad(n) {
    n = String(n);
    if (n.length == 1) {
        n = '0' + n;
    }
    return n;
}
