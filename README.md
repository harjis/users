# Local Setup

1. Create postgress secret and enable ingress
```shell script
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=my_pgpassword
kubectl create secret generic oktaissuer --from-literal OKTA_ISSUER=issuer_here
kubectl create secret generic oktaclientid --from-literal OKTA_CLIENTID=id_here
minikube addons enable ingress
```

2. Apply persistent volume claim. This is done separately so that skaffold dev doesn't clean up db on restarts
```shell script
./db-helpers/pvc-apply.sh
```

3. Start dev
```shell script
skaffold dev
```

4. Create db's and migrate
```shell script
./db-helpers/create-db.sh
./db-helpers/migrate.sh
```

5. Open tunnel to minikube (required for okta authentication)
```shell
sudo ssh -i $(minikube ssh-key) docker@$(minikube ip) -L 80:localhost:80
```

#GCP Setup

```shell script
helm repo add harjis-charts https://harjis.github.io/helm-charts/
helm install auth-service harjis-charts/authentication-service -f auth_values.yaml
```
