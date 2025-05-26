#!/bin/sh
#
# bootstrap.sh
#

usage()
{
	echo "Usage: $0 [domain]"
	exit 1
}

DOMAIN="$1"

[ -z "$DOMAIN" ] && usage

[ ! -d /srv/adm/bin ] && mkdir -p /srv/adm/bin
cd /srv/adm/bin

apt update 
apt -y upgrade
apt -y install ca-certificates curl
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin git rsync 