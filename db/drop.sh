#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply -f "${__dir}"/k8s/drop-users.yaml
echo "Waiting users drop"
kubectl wait --for=condition=complete --timeout=600s job/db-drop-users
echo "Delete users job"
kubectl delete job db-drop-users
