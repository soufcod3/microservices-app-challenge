CREATE DATABASE IF NOT EXISTS `comments_db`;

CREATE USER IF NOT EXISTS 'dev'@'%.%.%.%' IDENTIFIED BY 'devpassword';
grant select, update, insert, delete on comments_db.* to 'dev'@'%.%.%.%';

FLUSH PRIVILEGES;