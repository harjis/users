resource "null_resource" "godaddy_ip" {
  triggers = {
    run_always = timestamp()
  }

  provisioner "local-exec" {
    command = "./terraform/modules/godaddy-ip/add-ip-to-godaddy-dns-records.sh $KEY $SECRET $SUBDOMAIN $IP"

    environment = {
      KEY       = var.key
      SECRET    = var.secret
      SUBDOMAIN = var.subdomain
      IP        = var.public_ip
    }
  }
}
