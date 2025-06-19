---
id: tailscale-practical-guide
title: "Comprehensive Tailscale Practical Guide: Command Reference for Secure Networking"
sidebar_label: "Tailscale Practical"
sidebar_position: 4
description: "Complete practical reference commands for Tailscale mesh VPN - from installation to advanced networking workflows including Synology NAS access"
keywords:
 - tailscale
 - wireguard
 - vpn
 - mesh networking
 - zero trust
 - remote access
 - subnet router
 - exit node
 - synology nas
 - secure networking
 - devops
 - cloud networking
 - site-to-site
 - mobile access
authors: [gl0bal01]
tags: [Tool, Network]
---

# Tailscale Practical Guide

Tailscale is a modern VPN solution built on WireGuard that creates secure, encrypted mesh networks with zero configuration. It simplifies networking by treating the entire internet as hostile and creating a private overlay network that's easy to manage and scale. This guide serves as a comprehensive quick reference for administrators, developers, and users who need to quickly deploy, configure, and troubleshoot Tailscale networks.

<details>
  <summary>When to use this guide</summary>
- Setting up Tailscale for the first time across multiple devices
- Configuring advanced networking features like subnet routers and exit nodes
- Implementing secure remote access for teams and infrastructure
- Troubleshooting connectivity and performance issues
- Integrating Tailscale with existing infrastructure and workflows
</details>
<details>
  <summary>Who this guide is for</summary>
- Network administrators and IT professionals
- DevOps engineers and system administrators
- Security professionals implementing zero-trust networks
- Remote teams needing secure connectivity
- Developers working with distributed systems
- Anyone seeking to replace traditional VPNs with modern mesh networking
</details>

## Installation & Setup

### Quick Installation Commands

```bash
# Ubuntu/Debian
curl -fsSL https://tailscale.com/install.sh | sh

# CentOS/RHEL/Fedora
curl -fsSL https://tailscale.com/install.sh | sh

# Arch Linux
sudo pacman -S tailscale

# macOS (Homebrew)
brew install tailscale

# Windows (Chocolatey)
choco install tailscale

# Direct Go installation (any platform)
go install tailscale.com/cmd/tailscale{,d}
```

### Platform-Specific Installation

```bash
# Ubuntu/Debian with APT
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt update && sudo apt install tailscale

# CentOS/RHEL with YUM
sudo yum install yum-utils
sudo yum-config-manager --add-repo https://pkgs.tailscale.com/stable/centos/8/tailscale.repo
sudo yum install tailscale

# Enable and start daemon
sudo systemctl enable --now tailscaled
```

## First Time Setup

### Basic Connection

```bash
# Connect to Tailscale (opens browser for authentication)
sudo tailscale up

# Connect with specific options
sudo tailscale up --accept-routes --accept-dns

# Connect with hostname
sudo tailscale up --hostname=my-server

# Connect without browser (get URL for manual auth)
sudo tailscale up --qr
```

### Authentication & Auth Keys

```bash
# Create auth key (from admin console)
# Use pre-auth key for unattended setup
sudo tailscale up --authkey=tskey-auth-xxxxxx

# One-time auth key for ephemeral nodes
sudo tailscale up --authkey=tskey-auth-xxxxxx --ephemeral

# Tagged node authentication
sudo tailscale up --authkey=tskey-auth-xxxxxx --advertise-tags=tag:server
```

## Basic Operations

### Connection Management

```bash
# Connect to Tailscale
sudo tailscale up

# Disconnect (but keep daemon running)
sudo tailscale down

# Check connection status
tailscale status

# Detailed status with IPs and last seen
tailscale status --peers

# JSON output for scripting
tailscale status --json

# Show current device IP
tailscale ip

# Show specific IP version
tailscale ip -4  # IPv4 only
tailscale ip -6  # IPv6 only
```

### Network Information

```bash
# Check network connectivity
tailscale netcheck

# Ping another device
tailscale ping hostname-or-ip

# Test SSH connectivity
tailscale nc hostname 22

# DNS query through Tailscale
tailscale dns status
tailscale dns query hostname.example.com
```

## Advanced Configuration

### Exit Nodes

```bash
# Enable as exit node (route all internet traffic)
sudo tailscale up --advertise-exit-node

# Enable IP forwarding for exit node (Linux)
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

# Use another device as exit node
sudo tailscale up --exit-node=exit-server
sudo tailscale up --exit-node=100.64.0.1

# Allow local network access while using exit node
sudo tailscale up --exit-node=exit-server --exit-node-allow-lan-access

# Disable exit node
sudo tailscale up --exit-node=

# List available exit nodes
tailscale exit-node list
```

### Subnet Routers

```bash
# Advertise subnet routes
sudo tailscale up --advertise-routes=10.0.0.0/24,192.168.1.0/24

# Single subnet
sudo tailscale up --advertise-routes=192.168.1.0/24

# Multiple subnets
sudo tailscale up --advertise-routes=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16

# Accept routes from other subnet routers
sudo tailscale up --accept-routes

# Enable IP forwarding for subnet router (Linux)
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Check if routes are approved (admin console required)
tailscale status | grep "offers"
```

### SSH Configuration

```bash
# Enable Tailscale SSH server
sudo tailscale up --ssh

# Connect via Tailscale SSH
tailscale ssh user@hostname

# SSH with port forwarding
tailscale ssh -L 8080:localhost:80 user@hostname

# Check SSH host keys
tailscale ssh --check-host-keys user@hostname

# Use traditional SSH through Tailscale (userspace networking)
ssh -o ProxyCommand='tailscale nc %h %p' user@hostname.tailnet.ts.net
```

## Service Sharing

### Tailscale Serve (Internal Sharing)

```bash
# Share a local web server within tailnet
tailscale serve 3000

# Share with custom path
tailscale serve --https=443 --set-path=/app localhost:3000

# Share static files
tailscale serve --https=443 /home/user/public_html

# Share text content
tailscale serve --https=443 text:"Hello from Tailscale"

# TCP forwarding
tailscale serve --tcp=2222 localhost:22

# TLS-terminated TCP
tailscale serve --tls-terminated-tcp=443 localhost:8080

# View serve status
tailscale serve status

# Turn off specific serve
tailscale serve --https=443 --set-path=/app off
```

### Tailscale Funnel (Public Sharing)

```bash
# Share publicly on the internet
tailscale funnel 3000

# Share with specific port
tailscale funnel --https=443 localhost:3000

# Share files publicly
tailscale funnel --https=443 /home/user/website

# TCP funnel (limited ports: 443, 8443, 10000)
tailscale funnel --tcp=443 localhost:8080

# View funnel status
tailscale funnel status

# Turn off funnel
tailscale funnel --https=443 off
```

## Device Management

### Device Information

```bash
# Show device information
tailscale whois 100.64.0.1
tailscale whois hostname.tailnet.ts.net

# Show current device details
tailscale status --self

# Update Tailscale client
sudo tailscale update

# Check for updates
tailscale update --check

# View version information
tailscale version
```

### Authentication & Logout

```bash
# Manual login (if needed)
tailscale login

# Login with specific login server
tailscale login --login-server=https://headscale.example.com

# Switch between tailnets
tailscale switch

# Logout from current tailnet
tailscale logout

# Force re-authentication
tailscale logout && tailscale up
```

## Security & Access Control

### Device Security

```bash
# Enable shields up (block incoming connections)
sudo tailscale up --shields-up

# Reset to default settings
sudo tailscale up --reset

# Disable specific features
sudo tailscale up --disable-magic-dns

# Run with minimal privileges
sudo tailscale up --operator=tailscale
```

### Key Management

```bash
# Show node key
tailscale debug daemon-logs

# Generate new machine key (requires re-auth)
tailscale logout && tailscale up

# Lock tailnet (requires admin)
tailscale lock init

# Sign node key
tailscale lock sign
```

## DNS Configuration

### MagicDNS

```bash
# Check DNS status
tailscale dns status

# Query through Tailscale DNS
tailscale dns query hostname.tailnet.ts.net

# Enable/disable DNS
sudo tailscale up --accept-dns=true
sudo tailscale up --accept-dns=false

# Custom DNS servers
sudo tailscale up --accept-dns=false
```

## Monitoring & Debugging

### Network Diagnostics

```bash
# Network connectivity check
tailscale netcheck

# Detailed network report
tailscale netcheck --verbose

# Monitor real-time logs
tailscale debug daemon-logs

# Connection ping with details
tailscale ping --verbose hostname

# Port connectivity test
tailscale nc hostname 22
tailscale nc hostname 80
```

### Performance Monitoring

```bash
# Show metrics
tailscale debug metrics

# Connection info
tailscale debug connectivity

# Peer connection details
tailscale status --peers --verbose

# Check for direct connections
tailscale status | grep "direct"
```

### Troubleshooting

```bash
# Generate bug report
tailscale bugreport

# Reset networking state
sudo tailscale down && sudo tailscale up

# Force DERP relay usage (troubleshooting)
sudo tailscale up --advertise-tags=tag:derp-only

# Check firewall rules (Linux)
sudo iptables -L -n | grep tailscale
sudo ufw status

# Verify daemon status
sudo systemctl status tailscaled
sudo journalctl -u tailscaled -f
```

## Advanced Features

### File Sharing (Taildrop)

```bash
# Send file to another device
tailscale file cp myfile.txt hostname:

# Send to specific user
tailscale file cp document.pdf username@hostname:

# Receive files (check inbox)
tailscale file get

# List pending files
tailscale file list
```

### Kubernetes Integration

```bash
# Deploy Tailscale operator
kubectl apply -f https://github.com/tailscale/tailscale/raw/main/cmd/k8s-operator/deploy/manifests/operator.yaml

# Create auth secret
kubectl create secret generic tailscale-auth --from-literal=TS_AUTHKEY=tskey-auth-xxxxxx

# Configure RBAC
export SA_NAME=tailscale
export TS_KUBE_SECRET=tailscale-auth
make rbac | kubectl apply -f-

# Deploy subnet router
make subnet-router | kubectl apply -f-

# Deploy proxy
export TS_DEST_IP="$(kubectl get svc nginx -o=jsonpath='{.spec.clusterIP}')"
make proxy | kubectl apply -f-
```

### Docker Integration

```bash
# Run Tailscale in Docker
docker run -d \
  --name=tailscale \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE \
  -v /dev/net/tun:/dev/net/tun \
  -v tailscale-data:/var/lib/tailscale \
  -e TS_AUTHKEY=tskey-auth-xxxxxx \
  tailscale/tailscale

# Use as sidecar
docker run -d \
  --name=app-with-tailscale \
  --network=container:tailscale \
  my-app:latest
```

## Environment Variables

### Common Environment Variables

```bash
# Authentication
export TS_AUTHKEY=tskey-auth-xxxxxx

# State directory
export TS_STATE_DIR=/var/lib/tailscale

# Socket path
export TS_SOCKET=/var/run/tailscale/tailscaled.sock

# Hostname override
export TS_HOSTNAME=my-custom-name

# Routes for subnet router
export TS_ROUTES=10.0.0.0/8,172.16.0.0/12

# Kubernetes-specific
export TS_KUBE_SECRET=tailscale-auth
export TS_DEST_IP=10.0.0.1

# Userspace mode
export TS_USERSPACE=true

# Debug logging
export TS_DEBUG=true
```

## System Integration

### Systemd Configuration

```bash
# Enable automatic start
sudo systemctl enable tailscaled

# Start service
sudo systemctl start tailscaled

# Check service status
sudo systemctl status tailscaled

# View logs
sudo journalctl -u tailscaled -f

# Restart service
sudo systemctl restart tailscaled

# Custom service flags (edit /etc/default/tailscaled)
sudo echo 'FLAGS="--port=41641"' >> /etc/default/tailscaled
```

### Firewall Configuration

```bash
# UFW (Ubuntu)
sudo ufw allow in on tailscale0
sudo ufw allow out on tailscale0

# Firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-interface=tailscale0 --zone=trusted
sudo firewall-cmd --reload

# iptables (manual)
sudo iptables -A INPUT -i tailscale0 -j ACCEPT
sudo iptables -A OUTPUT -o tailscale0 -j ACCEPT
```

## Cloud Platform Integration

### AWS Integration

```bash
# Install on EC2 instance
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --authkey=tskey-auth-xxxxxx

# Subnet router for VPC
sudo tailscale up --advertise-routes=10.0.0.0/16 --authkey=tskey-auth-xxxxxx

# Security group rules
# Allow UDP 41641 for Tailscale traffic
# Allow TCP 22 for SSH (optional)
```

### Google Cloud Platform

```bash
# Install on GCE instance
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --authkey=tskey-auth-xxxxxx

# Advertise GCP subnet
sudo tailscale up --advertise-routes=10.128.0.0/20

# Firewall rule for Tailscale
gcloud compute firewall-rules create allow-tailscale \
  --allow udp:41641 \
  --source-ranges 0.0.0.0/0 \
  --target-tags tailscale
```

### Azure Integration

```bash
# Install on Azure VM
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up --authkey=tskey-auth-xxxxxx

# Network Security Group rule
# Allow UDP 41641 inbound from Internet
# Priority: 1000, Action: Allow
```

## Common Use Cases

### Remote Development

```bash
# Developer machine setup
sudo tailscale up --hostname=dev-laptop --ssh

# Access development server
tailscale ssh dev-server

# Port forwarding for web apps
tailscale serve --https=443 localhost:3000

# Share development environment
tailscale funnel --https=8443 localhost:3000
```

### Home Lab Access

```bash
# Home router/gateway setup
sudo tailscale up --advertise-routes=192.168.1.0/24 --advertise-exit-node

# Access home services
sudo tailscale up --accept-routes --exit-node=home-gateway

# Secure NAS access
tailscale ssh nas.local
tailscale serve --https=443 localhost:5000  # Synology DSM
```

### Synology NAS Remote Access

```bash
# Install Tailscale on Synology NAS
# Download package from Tailscale website for your Synology model
# Upload via Package Center > Manual Install

# Initial setup via SSH to Synology
ssh admin@synology-ip
sudo tailscale up --hostname=synology-nas

# Enable subnet router for local network access
sudo tailscale up --advertise-routes=192.168.1.0/24 --hostname=synology-nas

# For foreign country access - set up as exit node
sudo tailscale up --advertise-exit-node --advertise-routes=192.168.1.0/24

# Access DSM from anywhere
# https://synology-nas.tailnet-name.ts.net:5001

# Secure file sharing without opening ports
tailscale serve --https=443 localhost:5000  # DSM
tailscale serve --https=8443 localhost:5001 # DSM HTTPS

# Share specific services
tailscale serve --tcp=22 localhost:22       # SSH
tailscale serve --tcp=21 localhost:21       # FTP (if enabled)
tailscale serve --https=9443 localhost:9000 # Portainer (if installed)

# Mobile access from foreign countries
# 1. Install Tailscale mobile app
# 2. Connect to tailnet
# 3. Use exit node for local IP access
# 4. Access: http://192.168.1.100:5000 (local IP through exit node)

# Alternative: Direct access via Tailscale IP
# Access: https://100.x.x.x:5001 (Tailscale IP)
```

### Synology Advanced Configuration

```bash
# Enable IP forwarding on Synology (for subnet router)
# Via Control Panel > Terminal & SNMP > Enable SSH
# Then SSH in and run:
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Or via DSM Task Scheduler (Control Panel > Task Scheduler)
# Create triggered task -> Boot-up -> User: root
# Command: echo 'net.ipv4.ip_forward = 1' >> /etc/sysctl.conf && sysctl -p

# Automatic startup script (Control Panel > Task Scheduler)
# Create triggered task -> Boot-up -> User: root
# Command: /usr/local/bin/tailscale up --authkey=tskey-auth-xxxxx --advertise-exit-node

# QuickConnect alternative via Tailscale
# Disable QuickConnect in DSM
# Use Tailscale hostname instead: synology-nas.tailnet.ts.net

# VPN Server replacement
# Disable Synology VPN Server
# Use Tailscale exit node functionality instead
```

### Synology Security & Access Control

```bash
# Secure access from foreign countries
# 1. Disable all port forwarding on router
# 2. Disable QuickConnect
# 3. Use Tailscale ACLs for access control

# Example ACL for Synology access
{
  "acls": [
    {
      "action": "accept",
      "src": ["tag:mobile", "tag:laptop"],
      "dst": ["tag:synology:5000", "tag:synology:5001", "tag:synology:22"]
    },
    {
      "action": "accept",
      "src": ["tag:admin"],
      "dst": ["tag:synology:*"]
    }
  ],
  "hosts": {
    "synology-dsm": "100.x.x.x"
  }
}

# Two-factor authentication
# Enable 2FA in Synology DSM (Control Panel > User & Group > Advanced)
# Tailscale provides additional security layer

# Restrict SSH access
# Control Panel > Terminal & SNMP > Advanced Settings
# Enable "Enable SSH service" only when needed
# Use Tailscale SSH instead: tailscale ssh admin@synology-nas
```

### Synology Mobile Apps Configuration

```bash
# DS file app access from abroad
# 1. Install Tailscale on mobile device
# 2. Connect to tailnet and enable exit node
# 3. In DS file app settings:
#    - Server: 192.168.1.100 (local IP via exit node)
#    - Port: 5000 (HTTP) or 5001 (HTTPS)
#    - Account: your DSM username/password

# Alternative: Use Tailscale IP directly
# Server: 100.x.x.x (Tailscale IP of Synology)
# Port: 5000 or 5001

# DS photo, DS video, DS audio apps
# Same configuration as DS file
# Use local IP via exit node or direct Tailscale IP

# Synology Drive client
# Configure sync client with:
# Server: synology-nas.tailnet-name.ts.net
# Or: 100.x.x.x:5001

# Photo backup from abroad
# Enable Tailscale on mobile
# Configure DS photo with Synology Tailscale IP
# Photos upload securely without exposing NAS to internet
```

### Foreign Country Specific Setup

```bash
# Laptop/mobile setup while traveling
# Connect to local WiFi abroad
tailscale up --accept-routes --exit-node=synology-nas

# Access home network as if you're local
# All traffic routes through home connection
ping 192.168.1.1  # Home router accessible
curl http://192.168.1.100:5000  # DSM accessible

# Selective routing (more efficient)
tailscale up --accept-routes  # Accept only subnet routes, not exit node
# Then access via Tailscale IPs: 100.x.x.x:5000

# Split tunneling approach
# Use exit node only for home network access
tailscale up --exit-node=synology-nas --exit-node-allow-lan-access
# Local internet traffic stays local for better performance

# Troubleshooting abroad
# Check Tailscale connectivity
tailscale ping synology-nas
tailscale netcheck

# If connection issues in restrictive countries
# Try different DERP servers
tailscale netcheck --verbose

# Alternative: Use Tailscale Funnel for external access
# On Synology (for emergency access):
tailscale funnel --https=8443 localhost:5001
# Access via: https://synology-nas.tailnet-name.ts.net:8443
```

### Site-to-Site Connectivity

```bash
# Office A subnet router
sudo tailscale up --advertise-routes=10.1.0.0/24 --hostname=office-a-router

# Office B subnet router  
sudo tailscale up --advertise-routes=10.2.0.0/24 --hostname=office-b-router

# Client machines
sudo tailscale up --accept-routes
```

### Container Orchestration

```bash
# Kubernetes cluster access
sudo tailscale up --advertise-routes=10.244.0.0/16,10.96.0.0/12

# Docker Swarm integration
docker service create \
  --name tailscale-gateway \
  --cap-add NET_ADMIN \
  --mount type=bind,src=/dev/net/tun,dst=/dev/net/tun \
  -e TS_AUTHKEY=tskey-auth-xxxxxx \
  tailscale/tailscale

# Nomad job integration
job "tailscale" {
  datacenters = ["dc1"]
  type = "system"
  
  task "tailscale" {
    driver = "docker"
    config {
      image = "tailscale/tailscale:latest"
      cap_add = ["NET_ADMIN"]
      devices = [{ host_path = "/dev/net/tun" }]
    }
    env {
      TS_AUTHKEY = "tskey-auth-xxxxxx"
    }
  }
}
```

## Configuration Management

### Infrastructure as Code

```yaml
# Terraform example
resource "tailscale_tailnet_key" "example_key" {
  reusable      = false
  ephemeral     = true
  preauthorized = true
  expiry        = 3600
  description   = "Example key for servers"
  tags          = ["tag:server"]
}

# Ansible playbook
- name: Install Tailscale
  shell: curl -fsSL https://tailscale.com/install.sh | sh
  
- name: Connect to Tailscale
  shell: tailscale up --authkey={{ tailscale_auth_key }}
```

### GitOps ACL Management

```yaml
# GitHub Actions for ACL sync
name: Tailscale ACL syncing
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  acls:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Go environment
        uses: actions/setup-go@v3.2.0
      - name: Install gitops-pusher
        run: go install tailscale.com/cmd/gitops-pusher@latest
      - name: Deploy ACL
        if: github.event_name == 'push'
        env:
          TS_API_KEY: ${{ secrets.TS_API_KEY }}
          TS_TAILNET: ${{ secrets.TS_TAILNET }}
        run: |
          ~/go/bin/gitops-pusher --policy-file ./policy.hujson apply
```

## Security Best Practices

### Access Control Policies

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["tag:admin"],
      "dst": ["*:*"]
    },
    {
      "action": "accept", 
      "src": ["tag:developer"],
      "dst": ["tag:development:*"]
    }
  ],
  "ssh": [
    {
      "action": "accept",
      "src": ["tag:admin"],
      "dst": ["tag:server"],
      "users": ["root", "admin"]
    }
  ]
}
```

### Key Rotation

```bash
# Rotate machine key
tailscale logout
tailscale up --authkey=tskey-auth-new-xxxxxx

# Rotate auth keys regularly
# Generate new keys in admin console
# Update automation scripts

# Enable key expiry
# Set appropriate expiry times in admin console
```

## Troubleshooting Common Issues

### Connectivity Problems

```bash
# Basic connectivity test
tailscale ping 8.8.8.8

# Check if using DERP relay
tailscale status | grep relay

# Force direct connection
tailscale debug set-derp-map null

# Reset connection state
sudo tailscale down && sudo tailscale up --reset
```

### Performance Issues

```bash
# Check for direct connections
tailscale status | grep direct

# Network performance test
tailscale netcheck --verbose

# Enable verbose logging
sudo tailscaled --verbose=1

# Check CPU/memory usage
top -p $(pgrep tailscaled)
```

### DNS Resolution Issues

```bash
# Test MagicDNS
nslookup hostname.tailnet.ts.net

# Check DNS configuration
tailscale dns status

# Bypass MagicDNS temporarily
sudo tailscale up --accept-dns=false

# Flush DNS cache
sudo systemctl restart systemd-resolved  # Linux
sudo dscacheutil -flushcache            # macOS
ipconfig /flushdns                       # Windows
```

## References

- [Official Tailscale Documentation](https://tailscale.com/kb)
- [Tailscale GitHub Repository](https://github.com/tailscale/tailscale)
- [Tailscale CLI Reference](https://tailscale.com/kb/1080/cli)
- [Tailscale API Documentation](https://tailscale.com/api)
- [Zero Trust Architecture Guide](https://www.nist.gov/publications/zero-trust-architecture)