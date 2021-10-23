terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.22.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.3.0"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "1.11.3"
    }
  }

  backend "remote" {
    organization = "harjis-corp-advanced"

    workspaces {
      name = "users-service"
    }
  }
}

provider "linode" {
  token = var.token
}

provider "kubernetes" {
  host                   = local.api_endpoint
  token                  = local.api_token
  cluster_ca_certificate = local.ca_certificate
}

provider "kubectl" {
  host                   = local.api_endpoint
  cluster_ca_certificate = local.ca_certificate
  token                  = local.api_token
  load_config_file       = false
}

provider "helm" {
  kubernetes {
    host                   = local.api_endpoint
    token                  = local.api_token
    cluster_ca_certificate = local.ca_certificate
  }
}
