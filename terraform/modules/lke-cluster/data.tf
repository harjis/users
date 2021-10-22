data "kubectl_path_documents" "backend-service-manifests" {
  pattern = "${path.module}/backend-service.yaml"
  vars = {
    docker_image      = "d0rka/users-backend:${var.gitsha}"
    postgres_username = var.postgres_username
    postgres_host     = var.postgres_host
  }
}

data "kubectl_path_documents" "frontend-service-manifests" {
  pattern = "${path.module}/frontend-service.yaml"
  vars = {
    docker_image = "d0rka/users-frontend:${var.gitsha}"
  }
}

data "kubectl_path_documents" "create-db-manifests" {
  pattern = "${path.module}/create-users-prod.yaml"

  vars = {
    postgres_host     = var.postgres_host
    postgres_username = var.postgres_username
  }
}

data "kubectl_path_documents" "migrate-db-manifests" {
  pattern = "${path.module}/migrate-users-prod.yaml"

  vars = {
    postgres_host     = var.postgres_host
    postgres_username = var.postgres_username
  }
}
