terraform {
  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "1.11.3"
    }
  }
}

provider "kubectl" {
  host                   = local.api_endpoint
  cluster_ca_certificate = local.ca_certificate
  token                  = local.api_token
  load_config_file       = false
}
