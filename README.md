# Local Setup

1. Create postgress secret and enable ingress
```shell script
kubectl create secret generic pgpassword --from-literal postgresql-password=my_pgpassword
kubectl create secret generic oktaissuer --from-literal OKTA_ISSUER=issuer_here
kubectl create secret generic oktaclientid --from-literal OKTA_CLIENTID=id_here
minikube addons enable ingress
```

2. Install postgres
```shell script
./db/install.sh
./db/build-migration-image.sh
./db/create.sh
./db/migrate.sh
./db/seed.sh
```

3. Install authentication
```shell
./auth/install.sh
```

4. Start dev
```shell script
skaffold dev
```

5. Open tunnel to minikube
```shell
sudo ssh -i $(minikube ssh-key) docker@$(minikube ip) -L 80:localhost:80
```
If tunnel creation fails remove the previous ssh key. Use `minikube ip` here 
```shell
ssh-keygen -R 192.168.64.3
```

6. Access the application on [localhost:80](http://localhost:80)

#GCP Setup

```shell script
helm repo add harjis-charts https://harjis.github.io/helm-charts/
helm install auth-service harjis-charts/authentication-service -f k8s-helm/values.yaml
```

#Linode setup

```shell script
helm repo add harjis-charts https://harjis.github.io/helm-charts/
helm install auth-service harjis-charts/authentication-service -f k8s-helm/values.yaml
```

Install cert-manager (Make sure you use Option 1 and not Option 2):
https://cert-manager.io/docs/installation/kubernetes/#installing-with-helm

Install certificates (you only need to do this once)
```shell script
kubectl apply -f k8s-https/
```

Verify with:
```shell
kubectl get certificates
kubectl describe certificates 
```

Install production web gateway
```shell script
kubectl apply -f k8s-production/
```