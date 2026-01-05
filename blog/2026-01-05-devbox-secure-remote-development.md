---
slug: devbox-secure-remote-development
title: "DevBox: Zero-Trust Dev Environment with AI & Pentesting Built-In"
authors: [gl0bal01]
tags: [hosting, dev, ai, coding, productivity, pentesting]
date: 2026-01-05
---

Building a secure, feature-rich development environment shouldn't require weeks of configuration and security research. That's why I created **DevBox** — an automated provisioning script that transforms a fresh Ubuntu VPS into a production-ready development workstation in minutes.

<!-- truncate -->

## The Problem

Modern developers need powerful remote environments for various reasons: resource-intensive AI workloads, pentesting labs, or simply accessing a consistent development environment from anywhere. But spinning up a secure remote workstation typically means:

- Hours of manual configuration
- Complex networking and firewall rules
- Juggling multiple authentication mechanisms
- Exposing services to the public internet (yikes!)
- Wrestling with reverse proxy configurations

**DevBox solves all of this with a single script.**

## What Makes DevBox Different?

### 🔒 Zero-Trust by Default

Unlike traditional VPS setups that expose services on public IPs, DevBox implements a zero-trust architecture using [Tailscale](https://tailscale.com/). Only your SSH port faces the internet — everything else lives on your private mesh network.

```
[Internet] → [Port 5522 SSH Only]
              ↓
         [Tailscale Mesh]
              ↓
    [All Your Services: Private & Secure]
```

### 🚀 Everything You Need, Pre-Configured

DevBox includes a carefully curated stack for modern development:

- **Code-server**: Full VS Code experience in your browser
- **Ollama + Open WebUI**: Run LLMs locally without API costs
- **Exegol**: Complete pentesting toolkit for security research
- **Traefik**: Automatic service routing with clean internal URLs
- **Claude Code CLI**: AI-powered coding assistance right in your terminal

### 🎯 Built for Security Professionals

If you do penetration testing or security research, DevBox has you covered:

```bash
# Connect to HackTheBox/TryHackMe
htb-vpn ~/htb/lab.ovpn

# Launch Exegol with full VPN access
exegol

# All tools have direct access to the lab network
nmap, metasploit, gobuster, sqlmap...
```

The Exegol container runs on the host network, inheriting your VPN connection — no complex routing required.

## Quick Start

Getting started takes less than 10 minutes:

```bash
# Clone and configure
git clone https://github.com/gl0bal01/devbox.git
cd devbox
nano setup.sh  # Edit lines 20-30 with your details

# Run (requires root on a fresh Ubuntu 24.04 VPS)
chmod +x setup.sh
./setup.sh
```

The script handles:
- ✅ User creation with sudo privileges
- ✅ SSH hardening (custom port, key-only auth)
- ✅ UFW firewall configuration
- ✅ Tailscale installation and setup
- ✅ Docker stack deployment
- ✅ Development tool installation (mise, lazygit, lazyvim)
- ✅ Shell customization (Oh-My-Zsh with useful aliases)

## The Architecture

DevBox uses a simple but powerful architecture:

- **Tailscale** creates your private network
- **Traefik** routes traffic to services using clean URLs
- **Docker Compose** manages the entire stack
- **Internal DNS** gives you memorable service URLs

Access your services at:
- `http://code.internal` - VS Code
- `http://ai.internal` - Open WebUI
- `http://traefik.internal` - Traefik dashboard
- `http://ollama.internal` - Ollama API

## Real-World Use Cases

### Remote AI Development
Run resource-intensive LLM inference without expensive API costs:

```bash
docker exec -it ollama ollama pull llama3.2
docker exec -it ollama ollama pull codellama
```

Access your models through Open WebUI's ChatGPT-like interface or via API calls.

### Penetration Testing Labs
Connect to HackTheBox, TryHackMe, or corporate VPN environments:

```bash
htb-vpn ~/htb/academy-lab.ovpn
exegol  # Full toolkit with VPN access
```

### Team Development
Multiple developers can access the same environment via Tailscale, with ACLs controlling permissions.

### Personal Cloud IDE
Access your development environment from any device — laptop, tablet, or even your phone.

## Security Features

DevBox implements defense-in-depth:

1. **Network Layer**: Only SSH exposed, all services on private mesh
2. **Authentication**: Key-based SSH only, no password auth
3. **Firewall**: UFW with default-deny incoming policy
4. **Service Isolation**: Docker containers with minimal privileges
5. **Access Control**: Password-protected code-server, app-level auth for Open WebUI

## What's Next?

I'm actively developing DevBox and have several features planned:

- Automated backup configurations
- Additional pre-configured services (databases, monitoring)
- Integration with more AI models
- Enhanced security monitoring and logging
- Support for additional platforms beyond Ubuntu

## Try It Out

DevBox is completely open source and available now:

**GitHub**: [github.com/gl0bal01/devbox](https://github.com/gl0bal01/devbox)

Whether you're a security researcher, AI developer, or just want a powerful remote development environment, DevBox provides a solid foundation that's both secure and practical.

---
