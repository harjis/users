data "kubectl_file_documents" "issuer-manifests" {
  content = file("./modules/cert-manager-certificate/k8s/issuer.yaml")
}

data "kubectl_file_documents" "certificate-manifests" {
  content = file("./modules/cert-manager-certificate/k8s/certificate.yaml")
}
