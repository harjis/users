#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply -f "${__dir}"/k8s/create-users.yaml
echo "Waiting for users-db create"
kubectl wait --for=condition=complete --timeout=600s job/db-create-users
echo "Delete users-db create-job"
kubectl delete job db-create-users
