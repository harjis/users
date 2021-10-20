variable "public_ip" {
  description = "Public api of load balancer"
}

variable "key" {
  description = "GoDaddy API key"
}

variable "secret" {
  description = "GoDaddy API secret"
}

variable "subdomain" {
  description = "Subdomain name (users is the subdomain in 'users.harjukallio.club')"
}