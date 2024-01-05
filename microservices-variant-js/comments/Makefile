.SILENT=
COMMENTS_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-variant_comments)

start_db:
	mycli -h dbms -u root < ../dbms/ddl/init.sql
	mycli -h dbms -u root < ../dbms/ddl/ddl.sql

start_comments:
	docker exec -it $(COMMENTS_SERVICE_CONTAINER_ID) /bin/bash
