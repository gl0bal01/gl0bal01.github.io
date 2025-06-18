---
id: exegol-practical-guide
title: "Comprehensive Exegol Practical Guide: Command Reference for Cybersecurity Professionals"
sidebar_label: "Exegol"
sidebar_position: 2
description: "Complete practical reference commands for Exegol cybersecurity environment - from installation to advanced penetration testing workflows"
keywords:
  - exegol
  - cybersecurity
  - penetration testing
  - docker containers
  - security tools
  - red team
  - blue team
  - ethical hacking
  - kali linux
  - vpn
  - networking
  - automation
authors: [gl0bal01]
tags: [Tool, Cyber]
---

# Exegol Practical Guide - Quick Reference

## Introduction

Exegol is a powerful containerized cybersecurity testing environment that provides a comprehensive suite of penetration testing tools in a portable, reproducible format. This guide serves as a quick reference for both beginners and experienced security professionals who need to quickly set up, configure, and use Exegol containers for various cybersecurity tasks.

**When to use this guide:**
- Setting up Exegol for the first time
- Configuring containers for specific penetration testing scenarios
- Troubleshooting common issues
- Optimizing Exegol for different use cases

**Who this guide is for:**
- Penetration testers and ethical hackers
- Cybersecurity professionals
- Students learning cybersecurity
- Bug bounty hunters
- Red team operators
- Anyone needing a consistent, portable testing environment

## Installation & Setup

```bash
# Install prerequisites (Linux)
sudo apt update && sudo apt install -y git python3 pipx

# Install Docker (quick method)
curl -fsSL "https://get.docker.com/" | sh

# Install Exegol with pipx (recommended)
pipx install exegol

# Ensure pipx is in PATH
pipx ensurepath && exec $SHELL

# Set up auto-completion
pipx install argcomplete
echo "eval \"$(register-python-argcomplete --no-defaults exegol)\"" >> ~/.bashrc

# Create sudo alias (Linux only)
echo "alias exegol='sudo -E $(echo ~/.local/bin/exegol)'" >> ~/.bash_aliases && source ~/.bash_aliases

# Verify installation
exegol version
```

## First Time Usage

```bash
# Install your first image (interactive)
exegol install

# Install specific image directly
exegol install full

# Start your first container
exegol start

# Start container with specific image
exegol start mycontainer full

# Check info
exegol info
```

## Container Management

```bash
# List all containers and images
exegol info

# Start existing container
exegol start mycontainer

# Start with current directory as workspace
exegol start test full -cwd

# Start with custom workspace
exegol start test full -w "./project/pentest/"

# Stop container
exegol stop mycontainer

# Restart container
exegol restart mycontainer

# Remove container
exegol remove mycontainer

# Remove multiple containers (forced)
exegol remove -F container1 container2 container3
```

## Image Management

```bash
# Update image
exegol update full

# Update interactively
exegol update

# Uninstall image
exegol uninstall full

# Build custom image
exegol build myimage full

# Build with log
exegol build myimage full --build-log /tmp/build.log
```

## Networking & VPN

```bash
# Start with VPN configuration
exegol start htb full --vpn "~/vpn/lab.ovpn"

# Start with VPN auth file
exegol start htb full --vpn "~/vpn/config.ovpn" --vpn-auth "~/vpn/auth.txt"

# Start for manual VPN (with capabilities)
exegol start vpntest full -d /dev/net/tun --cap NET_ADMIN

# Network modes
exegol start test full --network host      # Share host network (default)
exegol start test full --network docker    # Docker bridge network
exegol start test full --network nat       # Isolated network (Pro/Enterprise)
exegol start test full --network disable   # No network

# Port forwarding
exegol start web full -p 8080:80 -p 4443:443

# Custom hostname
exegol start target full --hostname victim-pc
```

## Workspace & File Sharing

```bash
# Custom volumes
exegol start app full -V "/var/app/:/app/" -V "/tmp/shared:/shared:ro"

# Update filesystem permissions
exegol start test full -w "./project/" -fs

# Multiple workspace setups
exegol start web full -w "./web-project/"
exegol start ad full -w "./ad-project/"
exegol start mobile full -w "./mobile-project/"
```

## Environment & Shell Configuration

```bash
# Set environment variables
exegol start test full -e TARGET=192.168.1.100 -e DOMAIN=example.com

# Choose shell
exegol start test full --shell tmux
exegol start test full --shell bash

# Enable shell logging
exegol start test full -l
exegol start test full -l --log-method script

# Disable features
exegol start test full --disable-X11 --disable-my-resources
```

## Hardware & Device Access

```bash
# Share USB devices
exegol start hardware full -d "/dev/bus/usb/"

# Share specific device (e.g., Proxmark)
exegol start proxmark full -d "/dev/ttyACM0"

# Multiple devices
exegol start multi full -d "/dev/ttyACM0" -d "/dev/ttyUSB0"

# Privileged mode (dangerous)
exegol start privileged full --privileged

# Specific capabilities
exegol start network full --cap NET_ADMIN --cap SYS_PTRACE
```

## Desktop & GUI Applications

```bash
# Enable desktop (web-based)
exegol start gui full --desktop

# Desktop with custom config
exegol start gui full --desktop-config "http:0.0.0.0:5900"

# VNC desktop
exegol start gui full --desktop-config "vnc:127.0.0.1:5901"

# Get desktop credentials
exegol info gui

# Disable X11 (no GUI apps)
exegol start nogui full --disable-X11
```

## Command Execution

```bash
# Execute single command
exegol exec mycontainer nmap -sV 192.168.1.1

# Execute with output
exegol exec -v mycontainer 'nmap -h'

# Background execution
exegol exec -b mycontainer bloodhound

# Temporary container for command
exegol exec --tmp full nmap 192.168.1.1

# Privileged temporary execution
exegol exec --tmp --privileged full wireshark
```

## VPN Configuration Examples

```bash
# Single file VPN
exegol start htb full --vpn "./htb.ovpn"

# Multi-file VPN directory structure
mkdir my_vpn
# Place: configuration.ovpn, root_ca.pem, user.crt, user.key
exegol start vpn full --vpn "./my_vpn"

# VPN with authentication
echo -e "username\npassword" > auth.txt
exegol start vpn full --vpn "./config.ovpn" --vpn-auth "./auth.txt"
```

## Troubleshooting & Debugging

```bash
# Verbose information
exegol info -v
exegol info -vv
exegol info -vvv

# Check specific container
exegol info mycontainer

# Update wrapper
exegol update

# Fix Docker rate limiting
docker login

# Enable TIOCSTI (for arsenal tool)
sudo sysctl -w dev.tty.legacy_tiocsti=1

# Time synchronization for Kerberos
faketime "$(date +'%Y-%m-%d %H:%M:%S')" zsh

# Advanced time sync with domain controller
faketime "$(rdate -n $DC_IP -p | awk '{print $2, $3, $4}' | date -f - \"+%Y-%m-%d %H:%M:%S\")" zsh

# Time sync using net time
faketime "$(date +'%Y-%m-%d') $(net time -S $DC_IP | awk '{print $4}')" zsh

# View compressed logs
zcat /var/log/exegol/load_setups.log.gz
zgrep "error" /var/log/exegol/load_setups.log.gz
```

## Customization & Resources

```bash
# View available aliases
alias

# Inspect specific alias
alias nmap

# Add custom tools to PATH
cp /path/to/tool ~/.exegol/my-resources/bin/

# Custom environment variables in profile
echo 'export DOMAIN="example.com"' >> /opt/tools/Exegol-history/profile.sh
exec zsh

# Share files during engagement
updog          # HTTP server
goshs          # Go HTTP server
smbserver.py   # SMB server
```

## Advanced Operations

```bash
# Multiple containers for different tasks
exegol start web full -w "./web/" --hostname web-server
exegol start ad full -w "./ad/" --hostname dc-01
exegol start mobile full -w "./mobile/" --hostname mobile-test

# Container with comment
exegol start client1 full --comment "Client pentest - Company XYZ"

# Complex multi-feature setup
exegol start complex full \
  -w "./pentest/" \
  --vpn "./client.ovpn" \
  -e TARGET=192.168.1.0/24 \
  -e DOMAIN=company.local \
  -p 8080:80 \
  -d "/dev/bus/usb/" \
  --hostname client-pc \
  --desktop \
  -l

# Test custom image build
exegol install "testimage" "full" --build-log "/tmp/testimage.log"
exegol start "testcontainer" "testimage"

# Run build pipeline tests
cat /.exegol/build_pipeline_tests/all_commands.txt | grep -vE "^\s*$" | sort -u > /.exegol/build_pipeline_tests/all_commands.sorted.txt
python3 /.exegol/build_pipeline_tests/run_tests.py
cat /.exegol/build_pipeline_tests/failed_commands.log

# Log analysis
gunzip -c session_shell.asciinema.gz | asciinema play -
asciinema cat session_shell.asciinema

# Offline mode (no internet requests)
exegol start mycontainer --offline

# Architecture override
exegol start mycontainer full --arch arm64
exegol start mycontainer full --arch amd64

# Disable resource mounts
exegol start minimal full --disable-exegol-resources --disable-my-resources

# Custom shell configurations
echo "alias ll='ls -la'" >> /opt/my-resources/setup/zsh/aliases
echo "export CUSTOM_VAR=value" >> /opt/my-resources/setup/zsh/zshrc
echo "nmap -sV \$TARGET" >> /opt/my-resources/setup/zsh/history
```

## Pro/Enterprise Features

```bash
# Activate license
exegol activate

# NAT network mode (isolated)
exegol start isolated full --network nat

# Revoke license
exegol activate --revoke
```

## Quick Service Commands

```bash
# Start services
neo4j start                    # For BloodHound
bloodhound-ce                  # BloodHound Community Edition
trilium-start                  # Note-taking
burpsuite                      # HTTP proxy
ps-empire server               # Empire C2 framework
havoc server                   # Havoc C2 framework

# Desktop services
desktop-start                  # Start desktop
desktop-stop                   # Stop desktop
desktop-restart                # Restart desktop

# Database services
service postgresql start       # PostgreSQL for BloodHound CE
service postgresql stop
service postgresql restart
```

## WSL2 Optimization (Windows)

```cmd
REM Limit WSL2 resources
echo [wsl2] > %UserProfile%\.wslconfig
echo memory=8GB >> %UserProfile%\.wslconfig
echo processors=2 >> %UserProfile%\.wslconfig

REM Shrink WSL2 disk
wsl --shutdown
diskpart
select vdisk file="C:\Users\<USER>\AppData\Local\Docker\wsl\data\ext4.vhdx"
compact vdisk
```

## Common Use Cases

```bash
# Web Application Testing
exegol start webapp full -w "./webapp-test/" -p 8080:8080 --desktop

# Active Directory Assessment
exegol start ad full -w "./ad-assessment/" -e DOMAIN=company.local -e DC=192.168.1.10

# WiFi/Hardware Hacking
exegol start wifi full -d "/dev/bus/usb/" --privileged -w "./wifi-audit/"

# CTF/HackTheBox
exegol start htb full --vpn "./htb.ovpn" -w "./htb-machines/" -l

# Client Engagement with Full Setup
exegol start client full \
  -w "./client-pentest/" \
  --vpn "./client-vpn.ovpn" \
  -e CLIENT="Company XYZ" \
  -e TARGET="192.168.1.0/24" \
  -e DOMAIN="company.local" \
  --comment "External pentest Q1 2024" \
  --desktop \
  --hostname "pentest-01" \
  -l \
  -p 8080:8080
```

## Advanced Tips

```bash
# Advanced time synchronization examples
# Print time in UTC for comparison
date --utc

# Sync with Kerberos target to fix KRB_AP_ERR_SKEW
faketime 'YYYY-MM-DD hh:mm:ss' zsh

# Firefox customization examples
# Add custom bookmarks, extensions, and policies via:
# /opt/my-resources/setup/firefox/policies.json

# BloodHound customization
# Custom queries: /opt/my-resources/setup/bloodhound/customqueries_merge/
# Configuration: /opt/my-resources/setup/bloodhound/config.json

# Vim/Neovim customization
# Custom vimrc: /opt/my-resources/setup/vim/vimrc
# Neovim config: /opt/my-resources/setup/nvim/

# Shell history optimization
# The shell history system uses environment variables like:
# $DOMAIN, $USER, $PASSWORD, $TARGET for dynamic commands
```

## References

- [Official Exegol Documentation](https://docs.exegol.com/)
- [Exegol GitHub Repository](https://github.com/ThePorgs/Exegol)
