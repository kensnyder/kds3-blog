## Ken Snyder Blog


// https://github.com/jaredhanson/passport-google-oauth
require('passport-google-oauth');
// GET  /                list of posts, sticky posts
// GET  /posts/add       add post (admin)
// POST /posts/add       process new post (admin)
// GET  /posts/edit/:id  edit post (admin)
// POST /posts/edit/:id  process edit post (admin)
// POST /posts/del/:id   delete post (admin)
// GET  /posts/:slug     view post
// GET  /posts/admin     list of posts for admin page (admin)
// GET  /posts/import    import data from drupal (admin)
// POST /coments/add     process new comment
// GET  /coments/admin   view all comments (admin)
// POST /coments/ed/:id  edit comment (admin)
// POST /coments/del/:id delete comment (admin)
// GET  /tags/:tagname   search by tags
// GET  /search          search by keyword
// GET  /login           login screen
// POST /login           process login
// GET  /rss.xml        

// get ip addresses
function getIpAddress(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
 