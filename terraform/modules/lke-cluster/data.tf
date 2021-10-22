data "kubectl_path_documents" "backend-service-manifests" {
  pattern = "./k8s/backend-service.yaml"
  vars = {
    docker_image      = "d0rka/users-backend:${var.gitsha}"
    postgres_username = var.postgres_username
    postgres_host     = var.postgres_host
  }
}

data "kubectl_path_documents" "frontend-service-manifests" {
  pattern = "./k8s/frontend-service.yaml"
  vars = {
    docker_image = "d0rka/users-frontend:${var.gitsha}"
  }
}
