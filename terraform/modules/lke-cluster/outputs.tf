output "kubeconfig" {
  value     = linode_lke_cluster.kubernetes-cluster.kubeconfig
  sensitive = true
}

output "status" {
  value = linode_lke_cluster.kubernetes-cluster.status
}

output "api_endpoints" {
  value = linode_lke_cluster.kubernetes-cluster.api_endpoints
}

output "public_ip" {
  value = length(kubernetes_ingress.ingress-service.status.0.load_balancer.0.ingress) != 0 ? kubernetes_ingress.ingress-service.status.0.load_balancer.0.ingress.0.ip : ""
}