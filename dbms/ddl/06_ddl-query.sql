USE query_db;

DROP TABLE IF EXISTS query_comments;
DROP TABLE IF EXISTS query_posts;

create table query_posts (
    id varchar(36) NOT NULL,
    post_id varchar(36) NOT NULL,
    post_title varchar(50) NOT NULL,
    PRIMARY KEY(id),
    INDEX idx_post_id (post_id),
    UNIQUE INDEX query_posts_idx (post_id)
);

create table query_comments (
    id varchar(36) NOT NULL,
    comment_id varchar(36) NOT NULL,
    comment varchar(300) NOT NULL,
    comment_status varchar(15) NOT NULL,
    post_id varchar(36) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) REFERENCES query_posts(post_id) on delete cascade,
    INDEX idx_comment_id (comment_id)
);
