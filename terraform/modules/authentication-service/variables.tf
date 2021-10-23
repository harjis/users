variable "kubeconfig_string" {
  description = "LKE kubeconfig base64"
}

variable "api_endpoint" {
  description = "LKE API endpoint"
}

variable "values_file_path" {
  description = "values.yaml path"
}

variable "oktaissuer" {
  description = "Okta issuer"
}

variable "oktaclientid" {
  description = "Okta client ID"
}