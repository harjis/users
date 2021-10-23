locals {
  kubeconfig = yamldecode(var.kubeconfig_string)

  api_endpoint   = var.api_endpoint
  api_token      = local.kubeconfig.users[0].user.token
  ca_certificate = base64decode(local.kubeconfig.clusters[0].cluster["certificate-authority-data"])
}

resource "helm_release" "cert-manager" {
  wait       = false
  name       = "cert-manager"
  chart      = "cert-manager"
  repository = "https://charts.jetstack.io"
  version    = "v1.5.3"

  set {
    name  = "installCRDs"
    value = "true"
  }
}