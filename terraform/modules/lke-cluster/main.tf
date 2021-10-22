locals {
  kubeconfig_string = base64decode(linode_lke_cluster.kubernetes-cluster.kubeconfig)
  kubeconfig        = yamldecode(local.kubeconfig_string)

  api_endpoint   = linode_lke_cluster.kubernetes-cluster.api_endpoints[0]
  api_token      = local.kubeconfig.users[0].user.token
  ca_certificate = base64decode(local.kubeconfig.clusters[0].cluster["certificate-authority-data"])


  backend_labels = {
    component = "backend-server"
  }
}

resource "linode_lke_cluster" "kubernetes-cluster" {
  k8s_version = "1.21"
  label       = "users-service"
  region      = "ca-central"
  tags        = ["testing"]

  pool {
    type  = "g6-nanode-1"
    count = 1
  }
}

resource "kubernetes_secret" "pgpassword" {
  metadata {
    name = "pgpassword"
  }

  data = {
    postgresql-password = var.postgres_pass
  }
}

resource "helm_release" "ingress-nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  wait       = false
}

// Notice! kubectl_manifest for ingress-service can not be used because we can not get the load balancer IP out of it.
resource "kubernetes_ingress" "ingress-service" {
  depends_on             = [helm_release.ingress-nginx]
  wait_for_load_balancer = "true"
  metadata {
    name = "ingress-service"
    annotations = {
      "kubernetes.io/ingress.class"              = "nginx"
      "cert-manager.io/cluster-issuer"           = "letsencrypt-prod"
      "nginx.ingress.kubernetes.io/ssl-redirect" = "true"
    }
  }
  spec {
    tls {
      hosts       = ["${var.subdomain}.harjukallio.club"]
      secret_name = "harjukallio-club"
    }
    rule {
      host = "${var.subdomain}.harjukallio.club"
      http {
        path {
          path = "/"
          backend {
            service_name = "authentication-service-frontend-cluster-ip-service"
            service_port = "3001"
          }
        }
        path {
          path = "/api/"
          backend {
            service_name = "authentication-service-backend-proxy-cluster-ip-service"
            service_port = "3000"
          }
        }
      }
    }
  }
}

resource "kubernetes_ingress" "ingress-service-module-federation" {
  depends_on             = [helm_release.ingress-nginx]
  wait_for_load_balancer = "true"
  metadata {
    name = "ingress-service-module-federation"
    annotations = {
      "kubernetes.io/ingress.class"                = "nginx"
      "nginx.ingress.kubernetes.io/rewrite-target" = "/$2"
    }
  }
  spec {
    rule {
      host = "${var.subdomain}.harjukallio.club"
      http {
        path {
          path = "/main_app_mf(/|$)(.*)"
          backend {
            service_name = "frontend-cis"
            service_port = "3001"
          }
        }
      }
    }
  }
}

resource "kubectl_manifest" "backend-server" {
  yaml_body = element(data.kubectl_path_documents.backend-service-manifests.documents, 0)
}

resource "kubectl_manifest" "backend-cis" {
  yaml_body = element(data.kubectl_path_documents.backend-service-manifests.documents, 1)
}
