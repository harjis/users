terraform {
  required_providers {
    helm = {
      source  = "hashicorp/helm"
      version = "2.3.0"
    }
  }
}

provider "helm" {
  kubernetes {
    host                   = local.api_endpoint
    token                  = local.api_token
    cluster_ca_certificate = local.ca_certificate
  }
}
