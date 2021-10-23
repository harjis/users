data "kubectl_path_documents" "backend-service-manifests" {
  pattern = "${path.module}/k8s/backend-service-prod.yaml"
  vars = {
    docker_image     = "d0rka/users-backend:${var.gitsha}"
    rails_master_key = var.rails_master_key
  }
}

data "kubectl_path_documents" "frontend-service-manifests" {
  pattern = "${path.module}/k8s/frontend-service-prod.yaml"
  vars = {
    docker_image = "d0rka/users-frontend:${var.gitsha}"
  }
}

data "kubectl_path_documents" "postgres-pvc-manifests" {
  pattern = "${path.module}/k8s/db-pvc.yaml"
}

data "kubectl_path_documents" "create-db-manifests" {
  pattern = "${path.module}/k8s/create-users-prod.yaml"

  vars = {
    gitsha           = var.gitsha
    rails_master_key = var.rails_master_key
  }
}

data "kubectl_path_documents" "migrate-db-manifests" {
  pattern = "${path.module}/k8s/migrate-users-prod.yaml"

  vars = {
    gitsha           = var.gitsha
    rails_master_key = var.rails_master_key
  }
}
