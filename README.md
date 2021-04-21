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

#GCP Setup

```shell script
helm repo add harjis-charts https://harjis.github.io/helm-charts/
helm install auth-service harjis-charts/authentication-service -f k8s-helm/auth_values.yaml
```

#Linode setup

```shell script
helm repo add harjis-charts https://harjis.github.io/helm-charts/
helm install auth-service harjis-charts/authentication-service -f k8s-helm/auth_values.yaml
```

Install cert-manager (Make sure you use Option 1 and not Option 2):
https://cert-manager.io/docs/installation/kubernetes/#installing-with-helm

Install certificates (you only need to do this once)
```shell script
kubectl apply -f k8s-https/
```

Install production web gateway
```shell script
kubectl apply -f k8s-production/
```