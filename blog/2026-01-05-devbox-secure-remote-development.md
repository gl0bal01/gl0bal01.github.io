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
- Exposing services to the public internet
- Wrestling with reverse proxy configurations

**DevBox solves all of this with a single script.**

## What Makes DevBox Different?

### Zero-Trust by Default

Unlike traditional VPS setups that expose services on public IPs, DevBox implements a zero-trust architecture using [Tailscale](https://tailscale.com/). Only your SSH port faces the internet — everything else lives on your private mesh network.

```
[Internet] → [Port 5522 SSH Only]
              ↓
         [Tailscale Mesh]
              ↓
    [All Your Services: Private & Secure]
```

### Full AI Development Stack

DevBox includes a comprehensive suite of AI coding tools:

| Tool | Provider | Purpose |
|------|----------|---------|
| Claude Code | Anthropic | AI-assisted coding CLI |
| OpenCode | Open-source | Multi-provider AI coding |
| Goose | Block | AI coding agent |
| LLM | Datasette | CLI for language models |
| Fabric | danielmiessler | AI prompts framework |

Plus **Ollama + Open WebUI** for running LLMs locally without API costs.

### Built for Security Professionals

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
- User creation with sudo privileges
- SSH hardening (custom port, key-only auth)
- UFW firewall configuration
- Tailscale installation and setup
- Docker stack deployment
- Development tool installation (mise, lazygit, lazydocker, lazyvim)
- Shell customization (Oh-My-Zsh with useful aliases)
- AI dev stack installer for Claude Code, OpenCode, Goose, LLM, and Fabric

## The Architecture

DevBox uses a simple but powerful architecture:

```
+-------------------------------------------------------------------------+
|                                   VPS                                   |
|                                                                         |
|   [Tailscale] <---> [Your Devices]                                      |
|        |                                                                |
|        v                                                                |
|   [Traefik :80] ----+---- [Open WebUI]      ai.internal                 |
|        |            +---- [Ollama API]      ollama.internal             |
|        |            +---- [Traefik Dashboard] traefik.internal          |
|        |                                                                |
|        +---> [Docker Socket Proxy] ---> /var/run/docker.sock            |
|              (internal network, read-only API access)                   |
|                                                                         |
|   [Exegol Container] <---> [HTB/THM VPN]                                |
|   [AI Dev Stack] - Claude Code, OpenCode, Goose, LLM, Fabric            |
+-------------------------------------------------------------------------+
```

Access your services at:
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

Access your models through Open WebUI's ChatGPT-like interface or via API calls. Connect your local IDE to the remote Ollama instance using included laptop setup scripts.

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

## Security Hardening (v2.3)

DevBox implements defense-in-depth with production-grade container security:

| Measure | Implementation |
|---------|----------------|
| Secrets Management | .env files with 600 permissions |
| Docker Socket Protection | Traefik uses docker-socket-proxy |
| Privilege Escalation Prevention | All containers have `no-new-privileges:true` |
| Capability Dropping | All containers have `cap_drop: ALL` |
| Resource Limits | Memory, CPU, and PID limits on all containers |
| Health Checks | All services have health checks configured |

**Network Security:**
- Only SSH (port 5522) exposed to the public internet
- All other services accessible only via Tailscale
- UFW firewall with default deny incoming

**Authentication:**
- SSH: Key-based only (password disabled, root login disabled)
- Open WebUI: Application-level auth (disable signup after admin creation)
- Traefik Dashboard: Basic Auth protected

## Try It Out

DevBox is completely open source and available now:

**GitHub**: [github.com/gl0bal01/devbox](https://github.com/gl0bal01/devbox)

The repository includes comprehensive documentation: quick reference guides, Ollama optimization tips, remote IDE setup instructions, and troubleshooting guides.

Whether you're a security researcher, AI developer, or just want a powerful remote development environment, DevBox provides a solid foundation that's both secure and practical.

---

