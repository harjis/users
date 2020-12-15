kubectl exec -it deployment/backend-deployment -- createdb -U postgres 'users_development'

kubectl rollout restart deployment/backend-deployment
