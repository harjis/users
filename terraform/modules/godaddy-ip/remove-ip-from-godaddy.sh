#!/bin/bash

# How to:
#   ./add-ip-to-godaddy-dns-records.sh godaddykey godaddysecret subdomain

key=$1
secret=$2
subdomain=$3

domain="harjukallio.club"
type="A" # Record type A, CNAME, MX, etc.
headers="Authorization: sso-key $key:$secret"

existing_subdomain_count=$(curl -s -X GET -H "$headers" \
  "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" | jq 'length')

if [ "$existing_subdomain_count" -eq 0 ]; then
  echo "No existing subdomain found. No action"
else
  echo "Subdomain found. Removing it"

  curl -s \
    -X DELETE "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" \
    -H "accept: application/json" \
    -H "Content-Type: application/json" \
    -H "$headers"
fi
