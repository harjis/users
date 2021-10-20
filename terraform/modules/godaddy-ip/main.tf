resource "null_resource" "godaddy_ip" {
  triggers = {
    key       = var.key
    secret    = var.secret
    public_ip = var.public_ip
    subdomain = var.subdomain
  }

  provisioner "local-exec" {
    command = "./terraform/modules/godaddy-ip/add-ip-to-godaddy-dns-records.sh $KEY $SECRET $SUBDOMAIN $IP"

    environment = {
      KEY       = self.triggers.key
      SECRET    = self.triggers.secret
      SUBDOMAIN = self.triggers.subdomain
      IP        = self.triggers.public_ip
    }
  }
}
