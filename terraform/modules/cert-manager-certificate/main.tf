locals {
  kubeconfig = yamldecode(var.kubeconfig_string)

  api_endpoint   = var.api_endpoint
  api_token      = local.kubeconfig.users[0].user.token
  ca_certificate = base64decode(local.kubeconfig.clusters[0].cluster["certificate-authority-data"])
}

resource "kubectl_manifest" "issuer" {
  yaml_body = element(data.kubectl_file_documents.issuer-manifests.documents, 0)
}

resource "kubectl_manifest" "certificate" {
  depends_on = [kubectl_manifest.issuer]
  yaml_body  = element(data.kubectl_file_documents.certificate-manifests.documents, 0)
}
