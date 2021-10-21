#!/bin/bash

VERSION=0.1.0
SHA=$(git rev-parse HEAD)

eval $(minikube -p minikube docker-env)

# PostService-DbMigrations
docker build \
-t d0rka/users-backend:latest \
-t d0rka/users-backend:"$SHA" \
-t d0rka/users-backend:$VERSION \
-f ./backend/Dockerfile.dev ./backend
