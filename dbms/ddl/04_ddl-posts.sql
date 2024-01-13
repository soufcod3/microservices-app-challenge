USE posts_db;

DROP TABLE IF EXISTS posts;

create table posts (
    id varchar(36) NOT NULL,
    title varchar(50) NOT NULL,
    PRIMARY KEY(id)
);