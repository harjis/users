variable "token" {
  description = "Your Linode API Personal Access Token. (required)"
}

variable "gitsha" {
  description = "Git SHA"
}

variable "subdomain" {
  description = "Subdomain name (users is the subdomain in 'users.harjukallio.club') Do not ADD default here!"
}

variable "postgres_username" {
  description = "Username for postgres"
}

variable "postgres_password" {
  description = "Password for postgres"
}

variable "postgres_host" {
  description = "host for postgres"
  default     = "10.0.0.1"
}