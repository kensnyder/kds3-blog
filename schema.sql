CREATE TABLE posts (
	id        SERIAL PRIMARY KEY,
	slug	  varchar(100),
	title     varchar(100),
	markdown  text,
	html      text,
	created   date,
	status    varchar(16),
	is_sticky boolean
);
ALTER TABLE posts ADD CONSTRAINT unique_posts_slug UNIQUE (slug);
CREATE INDEX ON posts ((lower(title)));
CREATE INDEX ON posts ((lower(title)));
CREATE INDEX ON posts ((lower(html)));
CREATE INDEX ON posts (created);
CREATE INDEX ON posts (status);
CREATE INDEX ON posts (is_sticky);


CREATE TABLE comments (
	id        SERIAL PRIMARY KEY,
	author	  varchar(100),
	markdown  text,
	html      text,
	created   timestamp WITH TIME ZONE
);
CREATE INDEX ON comments ((lower(html)));
CREATE INDEX ON comments (created);


CREATE TABLE tags (
	id        SERIAL PRIMARY KEY,
	slug	  varchar(15),
	name	  varchar(30)
);
ALTER TABLE posts ADD CONSTRAINT unique_tags_slug UNIQUE (slug);


CREATE TABLE posts_tags (
	post_id   integer,
	tag_id	  integer
);
CREATE INDEX ON posts_tags (post_id);
CREATE INDEX ON posts_tags (tag_id);


INSERT INTO tags (slug, name) VALUES('cakephp','CakePHP');
INSERT INTO tags (slug, name) VALUES('css','CSS');
INSERT INTO tags (slug, name) VALUES('html','HTML');
INSERT INTO tags (slug, name) VALUES('javascript','JavaScript');
INSERT INTO tags (slug, name) VALUES('jquery','jQuery');
INSERT INTO tags (slug, name) VALUES('linux','Linux');
INSERT INTO tags (slug, name) VALUES('os-x','OS X');
INSERT INTO tags (slug, name) VALUES('php','PHP');
INSERT INTO tags (slug, name) VALUES('prototype-js','Prototype JS');
INSERT INTO tags (slug, name) VALUES('sql','SQL');
INSERT INTO tags (slug, name) VALUES('technology','Technology');
INSERT INTO tags (slug, name) VALUES('web-development','Web Development');