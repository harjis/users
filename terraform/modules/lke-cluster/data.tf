data "kubectl_path_documents" "backend-service-manifests" {
  pattern = "${path.module}/k8s/backend-service.yaml"
  vars = {
    docker_image      = "d0rka/users-backend:${var.gitsha}"
    postgres_username = var.postgres_username
    postgres_host     = var.postgres_host
  }
}

data "kubectl_path_documents" "frontend-service-manifests" {
  pattern = "${path.module}/k8s/frontend-service.yaml"
  vars = {
    docker_image = "d0rka/users-frontend:${var.gitsha}"
  }
}

data "kubectl_path_documents" "postgres-pvc-manifests" {
  pattern = "${path.module}/k8s/db-pvc.yaml"
}

data "kubectl_path_documents" "postgres-service-manifests" {
  pattern = "${path.module}/k8s/postgres-service.yaml"
}

data "kubectl_path_documents" "create-db-manifests" {
  pattern = "${path.module}/k8s/create-users-prod.yaml"

  vars = {
    gitsha            = var.gitsha
    postgres_host     = var.postgres_host
    postgres_username = var.postgres_username
  }
}

data "kubectl_path_documents" "migrate-db-manifests" {
  pattern = "${path.module}/k8s/migrate-users-prod.yaml"

  vars = {
    gitsha            = var.gitsha
    postgres_host     = var.postgres_host
    postgres_username = var.postgres_username
  }
}
