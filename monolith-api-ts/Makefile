.SILENT=
API_CONTAINER_ID:=$(shell docker ps -qf name=monolith-app-ts_api)

start:
	docker-compose up -d

sh:
	docker exec -it $(API_CONTAINER_ID) /bin/bash

down:
	docker-compose down