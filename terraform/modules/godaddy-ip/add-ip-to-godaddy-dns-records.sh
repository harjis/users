#!/bin/bash

# How to:
#   ./add-ip-to-godaddy-dns-records.sh godaddykey godaddysecret subdomain newip

key=$1
secret=$2
subdomain=$3
new_ip=$4

domain="harjukallio.club"
ttl="3600"
type="A" # Record type A, CNAME, MX, etc.
port=443
weight=0
priority=0
headers="Authorization: sso-key $key:$secret"

existing_subdomain_count=$(curl -s -X GET -H "$headers" \
  "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" | jq 'length')

if [ "$existing_subdomain_count" -eq 0 ]; then
  echo "No existing subdomain found. Creating/updating one"
  curl \
    -s \
    -X PUT "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" \
    -H "accept: application/json" \
    -H "Content-Type: application/json" \
    -H "$headers" \
    -d "[
    {
    \"data\": \"$new_ip\",
    \"port\": 443,
    \"priority\": 0,
    \"protocol\": \"string\",
    \"service\": \"string\",
    \"ttl\": $ttl,
    \"weight\": 0
    }
    ]"
else
  echo "Subdomain found"

  existing_subdomain=$(curl -s -X GET -H "$headers" \
    "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" | jq)
  existing_ip=$(echo "$existing_subdomain" | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")

  if [ "$existing_ip" != "$new_ip" ]; then
    echo "Ips are not same. Updating"
    curl \
      -s \
      -X PUT "https://api.godaddy.com/v1/domains/$domain/records/$type/$subdomain" \
      -H "accept: application/json" \
      -H "Content-Type: application/json" \
      -H "$headers" \
      -d "[
    {
    \"data\": \"$new_ip\",
    \"port\": $port,
    \"priority\": $priority,
    \"protocol\": \"string\",
    \"service\": \"string\",
    \"ttl\": $ttl,
    \"weight\": $weight
    }
    ]"
  fi
fi
