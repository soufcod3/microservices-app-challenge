USE comments_db;

DROP TABLE IF EXISTS comments;

create table comments (
    id varchar(36) NOT NULL,
    content varchar(300) NOT NULL,
    post_id varchar(36) NOT NULL,
    status varchar(15) NOT NULL,
    PRIMARY KEY(id)
);