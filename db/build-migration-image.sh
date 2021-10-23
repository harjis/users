#!/bin/bash

SHA=$(git rev-parse HEAD)

eval "$(minikube -p minikube docker-env)"

docker build \
  -t d0rka/users-backend:latest \
  -t d0rka/users-backend:"$SHA" \
  -f ./backend/Dockerfile.dev ./backend
