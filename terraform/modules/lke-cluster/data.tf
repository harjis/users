data "kubectl_path_documents" "backend-service-manifests" {
  pattern = "./k8s/backend-service.yaml"
  vars = {
    docker_image = "d0rka/users-backend:${var.gitsha}"
  }
}

data "kubectl_path_documents" "frontend-service-manifests" {
  pattern = "./k8s/frontend-service.yaml"
  vars = {
    docker_image = "d0rka/users-frontend:${var.gitsha}"
  }
}
