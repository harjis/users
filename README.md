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
sudo ssh-keygen -R 192.168.64.3
```

6. Access the application on [localhost:80](http://localhost:80)

# Production setup:

- Open root module main.tf and comment out all other steps except Step 1.
- Run `terraform plan && terraform apply`
- Quite often creating ingress fails with `Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io":`
- Download kubeconfig from Linode and delete validation hook manually `kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`
- Re-run Step 1

- When Step 1 has completed successfully you can start uncommenting other steps 1 step at a time. Rest of the steps haven't been failing so far

## Needed secrets

- $TF_API_TOKEN
- $DOCKER_USERNAME
- $DOCKER_PASSWORD
- $GODADDY_SECRET
- $GODADDY_KEY
- $POSTGRES_PASSWORD
- $OKTA_ISSUER
- $OKTA_CLIENT_ID
- $RAILS_MASTER_KEY