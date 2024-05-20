# Get file .env
include .env
export $(shell sed 's/=.*//' .env)

# Folder constants
DOCKER_COMPOSE := docker-compose.yml


################# DOCKER #################

run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build
	
run-down:
	docker-compose -f $(DOCKER_COMPOSE) down

################# NEST #################

permistion:
	sudo chown -R 1000:1000 ./data/db

