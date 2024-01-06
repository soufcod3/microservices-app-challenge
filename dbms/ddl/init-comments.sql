CREATE DATABASE IF NOT EXISTS `microservices_variant_comments_db`;

CREATE USER IF NOT EXISTS 'dev'@'%.%.%.%' IDENTIFIED BY 'devpassword';
grant select, update, insert, delete on microservices_variant_comments_db.* to 'dev'@'%.%.%.%';

FLUSH PRIVILEGES;