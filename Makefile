.SILENT=

COMMENTS_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_comments)
QUERY_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_query)
POSTS_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_posts)
APP_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_app)
MODERATION_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_moderation)
EVENT_BUS_SERVICE_CONTAINER_ID:=$(shell docker ps -qf name=microservices-app-challenge_event-bus)

start_all:
	@echo "Starting all services"
	docker-compose up -d

stop_all:
	@echo "Stopping all services"
	docker-compose down

comments_sh:
	@echo "Entering comment service"
	docker exec -it $(COMMENTS_SERVICE_CONTAINER_ID) /bin/bash

query_sh:
	@echo "Entering query service"
	docker exec -it $(QUERY_SERVICE_CONTAINER_ID) /bin/bash

posts_sh:
	@echo "Entering posts service"
	docker exec -it $(POSTS_SERVICE_CONTAINER_ID) /bin/bash

app_sh:
	@echo "Entering app service"
	docker exec -it $(APP_SERVICE_CONTAINER_ID) /bin/bash

moderation_sh:
	@echo "Entering moderation service"
	docker exec -it $(MODERATION_SERVICE_CONTAINER_ID) /bin/bash

event_bus_sh:
	@echo "Entering event bus service"
	docker exec -it $(EVENT_BUS_SERVICE_CONTAINER_ID) /bin/bash
