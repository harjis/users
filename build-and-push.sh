#!/bin/bash

SHA=$(git rev-parse HEAD)

eval "$(minikube -p minikube docker-env)"

docker build \
  -t d0rka/users-backend:latest \
  -t d0rka/users-backend:$SHA \
  -f ./backend/Dockerfile ./backend
docker build \
  -t d0rka/users-frontend:latest \
  -t d0rka/users-frontend:$SHA \
  -f ./frontend/Dockerfile ./frontend

docker push d0rka/users-backend:latest
docker push d0rka/users-frontend:latest

docker push d0rka/users-backend:$SHA
docker push d0rka/users-frontend:$SHA
