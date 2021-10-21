locals {
  kubeconfig_string = base64decode(module.lke_cluster.kubeconfig)
  kubeconfig        = yamldecode(local.kubeconfig_string)

  api_endpoint   = module.lke_cluster.api_endpoints[0]
  api_token      = local.kubeconfig.users[0].user.token
  ca_certificate = base64decode(local.kubeconfig.clusters[0].cluster["certificate-authority-data"])


  backend_labels = {
    component = "backend-server"
  }
}

module "lke_cluster" {
  source = "./modules/lke-cluster"

  gitsha = var.gitsha
  token  = var.token

  subdomain = var.subdomain
}

# Step 2.

module "godaddy_ip" {
  source = "./modules/godaddy-ip"

  secret    = var.godaddy_secret
  key       = var.godaddy_key
  public_ip = module.lke_cluster.public_ip
  subdomain = var.subdomain
}

# Step 3.

module "authentication-service" {
  source             = "./modules/authentication-service"
  api_endpoint       = local.api_endpoint
  kubeconfig_string  = local.kubeconfig_string
  values_file_string = data.local_file.auth-values
}

# Step 4.
# We need to install cert-manager as a separate step from creating issuer and certificate
# Sometimes installation of cert-manager fails and re-running the steps with issuer&certificate included does not work

module "cert-manager" {
  source            = "./modules/cert-manager"
  api_endpoint      = local.api_endpoint
  kubeconfig_string = local.kubeconfig_string
}

# Step 5.

module "cert-manager-certificate" {
  source            = "./modules/cert-manager-certificate"
  api_endpoint      = local.api_endpoint
  kubeconfig_string = local.kubeconfig_string
}
