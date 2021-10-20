#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply -f "${__dir}"/k8s/migrate-users.yaml
echo "Waiting for users-db migration"
kubectl wait --for=condition=complete --timeout=600s job/db-migrate-users
echo "Delete users-db job"
kubectl delete job db-migrate-users
