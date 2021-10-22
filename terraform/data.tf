data "local_file" "auth-values" {
  filename = "${path.module}/values.yaml"
}