docker build -t d0rka/users-backend:latest -t d0rka/users-backend:$SHA -f ./backend/Dockerfile ./backend
docker build -t d0rka/users-frontend:latest -t d0rka/users-frontend:$SHA -f ./frontend/Dockerfile ./frontend

docker push d0rka/users-backend:latest
docker push d0rka/users-frontend:latest

docker push d0rka/users-backend:$SHA
docker push d0rka/users-frontend:$SHA

rm -f k8s/ingress-service.yaml
rm -f k8s/backend-deployment.yaml

kubectl apply -f k8s
kubectl apply -f k8s-ssl
kubectl set image deployments/backend-deployment backend=d0rka/users-backend:$SHA
kubectl set image deployments/frontend-deployment frontend=d0rka/users-frontend:$SHA

kubectl apply -f k8s-db-jobs/db-create.yaml
kubectl apply -f k8s-db-jobs/db-migrate.yaml

kubectl wait --for=condition=complete --timeout=600s job/db-migrate

kubectl delete job db-create
kubectl delete job db-migrate
