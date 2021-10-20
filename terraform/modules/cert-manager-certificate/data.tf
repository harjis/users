data "kubectl_file_documents" "issuer-manifests" {
  content = file("./k8s-https/issuer.yaml")
}

data "kubectl_file_documents" "certificate-manifests" {
  content = file("./k8s-https/certificate.yaml")
}
