CREATE DATABASE IF NOT EXISTS `posts_db`;

CREATE USER IF NOT EXISTS 'dev'@'%.%.%.%' IDENTIFIED BY 'devpassword';
grant select, update, insert, delete on posts_db.* to 'dev'@'%.%.%.%';

FLUSH PRIVILEGES;