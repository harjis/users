#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply -f "${__dir}"/k8s/seed-users.yaml
echo "Waiting for users-db seed"
kubectl wait --for=condition=complete --timeout=600s job/db-seed-users
echo "Delete users-db job"
kubectl delete job db-seed-users
