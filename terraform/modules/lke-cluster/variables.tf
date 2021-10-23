variable "token" {
  description = "Your Linode API Personal Access Token. (required)"
}

variable "gitsha" {
  description = "Git SHA"
}

variable "subdomain" {
  description = "Subdomain name (users is the subdomain in 'users.harjukallio.club') Do not ADD default here!"
}

variable "postgres_password" {
  description = "Password for postgres"
}
