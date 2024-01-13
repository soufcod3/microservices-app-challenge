CREATE DATABASE IF NOT EXISTS `query_db`;

CREATE USER IF NOT EXISTS 'dev'@'%.%.%.%' IDENTIFIED BY 'devpassword';
grant select, update, insert, delete on query_db.* to 'dev'@'%.%.%.%';

FLUSH PRIVILEGES;