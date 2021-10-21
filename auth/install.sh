#!/bin/bash

helm repo add authentication-service \
  https://harjis.github.io/authentication-service/
helm repo update

helm install authentication-service \
  authentication-service/authentication-service \
  -f k8s-helm/auth_values.yaml

