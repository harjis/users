locals {
  kubeconfig = yamldecode(var.kubeconfig_string)

  api_endpoint   = var.api_endpoint
  api_token      = local.kubeconfig.users[0].user.token
  ca_certificate = base64decode(local.kubeconfig.clusters[0].cluster["certificate-authority-data"])
}

resource "helm_release" "authentication-service" {
  wait       = false
  name       = "authentication-service"
  chart      = "authentication-service"
  repository = "https://harjis.github.io/authentication-service"
  version    = "0.1.0"

  values = [
    file(var.values_file_path)
  ]
}

resource "kubernetes_secret" "oktaissuer" {
  metadata {
    name = "oktaissuer"
  }

  data = {
    OKTA_ISSUER = var.oktaissuer
  }
}

resource "kubernetes_secret" "oktaclientid" {
  metadata {
    name = "oktaclientid"
  }

  data = {
    OKTA_CLIENTID = var.oktaclientid
  }
}
