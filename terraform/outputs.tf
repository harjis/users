output "api_endpoints" {
  value = module.lke_cluster.api_endpoints
}

output "status" {
  value = module.lke_cluster.status
}

output "public_ip" {
  value = module.lke_cluster.public_ip
}