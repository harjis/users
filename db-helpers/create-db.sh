kubectl exec -it deployment/postgres-deployment -- createdb -U postgres 'users_development'

kubectl rollout restart deployment/backend-deployment
