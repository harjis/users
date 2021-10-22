variable "token" {
  description = "Your Linode API Personal Access Token. (required)"
}

variable "gitsha" {
  description = "Git SHA"
}

#GoDaddy secrets should be found from .auto.tfvars-file
variable "godaddy_key" {
  description = "GoDaddy API key"
}

variable "godaddy_secret" {
  description = "GoDaddy API secret"
}

variable "subdomain" {
  description = "Subdomain name (users is the subdomain in 'users.harjukallio.club') Do not change the default!"
  default     = "users2"
}

variable "postgres_pass" {
  description = "Password for postgres"
}
