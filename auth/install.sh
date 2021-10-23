#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

helm repo add authentication-service \
  https://harjis.github.io/authentication-service/
helm repo update

helm install authentication-service \
  authentication-service/authentication-service \
  -f "$__dir/k8s/values.yaml"

