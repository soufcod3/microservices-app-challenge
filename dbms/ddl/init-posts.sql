CREATE DATABASE IF NOT EXISTS `microservices_variant_posts_db`;

CREATE USER IF NOT EXISTS 'dev'@'%.%.%.%' IDENTIFIED BY 'devpassword';
grant select, update, insert, delete on microservices_variant_posts_db.* to 'dev'@'%.%.%.%';

FLUSH PRIVILEGES;