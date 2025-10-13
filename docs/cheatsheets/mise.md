---
id: mise-practical-guide
title: "Comprehensive Mise Practical Guide: Command Reference for Developers"
sidebar_label: "Mise Practical"
sidebar_position: 3
description: "Complete practical reference for Mise polyglot runtime manager - installation, tool version management, environment configuration, and task automation across any programming language"
keywords:
  - mise
  - runtime manager
  - version manager
  - asdf alternative
  - nvm alternative
  - pyenv alternative
  - tool management
  - environment variables
  - task runner
  - development tools
  - polyglot development
  - devops automation
authors: [gl0bal01]
tags: [Tool, DevOps, Development]
---

# Mise Practical Guide

Mise (pronounced "MEEZ ahn plahs") is a polyglot runtime manager and task runner that replaces tools like asdf, nvm, pyenv, direnv, and make. It provides unified tool version management, environment variable control, and task execution across any programming language or development tool. This guide serves as a quick reference for both beginners and experienced developers who need to quickly set up, configure, and use mise for various development workflows.

<details>
  <summary>When to use this guide</summary>
- Setting up mise for the first time
- Managing multiple versions of development tools
- Configuring project-specific environments
- Creating automated development workflows
- Troubleshooting common issues
- Migrating from asdf, nvm, or other version managers
</details>
<details>
  <summary>Who this guide is for</summary>
- Software developers and DevOps engineers
- Full-stack developers managing multiple language runtimes
- Teams standardizing development environments
- Open source contributors working on diverse projects
- Anyone needing consistent, reproducible development setups
</details>

## Installation & Setup

### Quick Installation (Recommended)

```bash
# Universal install script (Linux/macOS)
curl https://mise.run | sh

# Verify installation
~/.local/bin/mise --version
```

### Platform-Specific Installation

```bash
# macOS with Homebrew
brew install mise

# Debian/Ubuntu
sudo apt update -y && sudo apt install -y gpg wget curl
sudo install -dm 755 /etc/apt/keyrings
wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor | sudo tee /etc/apt/keyrings/mise-archive-keyring.gpg 1> /dev/null
echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" | sudo tee /etc/apt/sources.list.d/mise.list
sudo apt update
sudo apt install -y mise

# Fedora/RHEL/CentOS
yum install -y yum-utils
yum-config-manager --add-repo https://mise.jdx.dev/rpm/mise.repo
yum install -y mise

# openSUSE
sudo wget https://mise.jdx.dev/rpm/mise.repo -O /etc/zypp/repos.d/mise.repo
sudo zypper refresh
sudo zypper install mise

# Arch Linux (AUR)
yay -S mise

# Windows with Scoop (Recommended)
scoop install mise

# Windows with winget
winget install jdx.mise

# Windows with Chocolatey
choco install mise

# Via npm (cross-platform)
npm install -g @jdxcode/mise

# From source with Cargo
cargo install mise

# Direct binary download
curl -L https://github.com/jdx/mise/releases/download/v2024.12.0/mise-v2024.12.0-linux-x64 > /usr/local/bin/mise
chmod +x /usr/local/bin/mise
```

### Shell Activation

```bash
# Bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc

# Zsh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc

# Fish
echo 'mise activate fish | source' >> ~/.config/fish/config.fish

# PowerShell (Windows)
echo 'mise activate pwsh | Out-String | Invoke-Expression' >> $HOME\Documents\PowerShell\Microsoft.PowerShell_profile.ps1

# Elvish
eval (mise activate elvish | slurp)

# Nushell
# Append to env.nu
mkdir ~/.config/nushell
mise activate nu | save -f ~/.config/nushell/mise.nu
echo "source ~/.config/nushell/mise.nu" | save --append ~/.config/nushell/env.nu
```

### Shell Completion

```bash
# Bash
mise completion bash > /etc/bash_completion.d/mise

# Zsh
mise completion zsh > /usr/local/share/zsh/site-functions/_mise

# Fish
mise completion fish > ~/.config/fish/completions/mise.fish

# PowerShell
mise completion pwsh >> $PROFILE
```

## First Time Usage

```bash
# Check mise version and configuration
mise version
mise doctor

# View available tools
mise registry

# Install your first tool (Node.js)
mise use --global node@22

# Verify installation
node --version
which node

# List installed tools
mise list

# Show current environment
mise env

# View configuration
mise config
mise cfg
```

## Tool Management

### Installing Tools

```bash
# Install latest version
mise use --global node@latest
mise use --global python@latest

# Install specific version
mise use --global node@20.11.0
mise use --global python@3.12.1

# Install multiple versions
mise use --global python@3.11 python@3.12

# Install LTS version
mise use --global node@lts

# Install from version prefix
mise use --global node@20
mise use --global python@3.12

# Project-local installation
cd myproject
mise use node@22
mise use python@3.11

# Install without activating
mise install node@20
mise install python@3.12

# Install all tools from mise.toml
mise install

# Install specific tool
mise install node

# Install and pin version
mise pin node@20.11.0
```

### Version Management

```bash
# List available versions for a tool
mise ls-remote node
mise ls-remote python
mise ls-remote terraform

# List installed versions
mise ls
mise list --current
mise list --installed

# Show latest version
mise latest node
mise latest python@3.12

# Use different version per directory
cd project1
mise use node@20

cd ../project2
mise use node@22

# Set global default
mise use --global node@lts

# Remove tool version
mise uninstall node@20.0.0
mise uninstall python@3.11.0

# Remove all versions of a tool
mise uninstall node --all

# Upgrade tools
mise upgrade
mise upgrade node
mise upgrade --bump
```

### Backend-Specific Tools

```bash
# Install from npm
mise use --global npm:@anthropic-ai/claude-code
mise use npm:typescript
mise use npm:eslint

# Install from pipx
mise use --global pipx:black
mise use pipx:pytest
mise use pipx:ansible

# Install from cargo
mise use cargo:ripgrep
mise use cargo:fd-find
mise use cargo:bat

# Install from GitHub releases
mise use github:BurntSushi/ripgrep
mise use github:sharkdp/fd
mise use github:casey/just

# Install from Aqua
mise use aqua:cli/cli
mise use aqua:junegunn/fzf

# Install from SPM (Swift Package Manager)
mise use spm:apple/swift-argument-parser

# Install via Go install
mise use go:github.com/charmbracelet/glow@latest
```

## Configuration

### Global Configuration

```bash
# Edit global config
mise config edit
mise cfg edit

# View global config
mise config get
mise cfg

# Set global settings
mise settings set always_keep_download true
mise settings set always_keep_install false
mise settings set experimental true

# View all settings
mise settings

# Location: ~/.config/mise/config.toml
```

### Project Configuration

```bash
# Create project config
cd myproject
mise use node@22 python@3.12

# Edit project config
mise config edit --path .

# View current directory config
mise cfg

# Multiple config file names supported:
# - mise.toml
# - .mise.toml
# - mise.local.toml (gitignored by default)
# - .mise/config.toml
# - .config/mise.toml
# - .config/mise/config.toml
```

### Example mise.toml

```toml
# Development tools
[tools]
node = "22"
python = "3.12"
terraform = "1.6"
go = "1.21"
kubectl = "latest"
helm = "3"

# Environment variables
[env]
DATABASE_URL = "postgresql://localhost:5432/dev"
API_KEY = "dev-key-123"
LOG_LEVEL = "debug"
NODE_ENV = "development"

# Project tasks
[tasks.dev]
description = "Start development server"
run = "npm run dev"

[tasks.test]
description = "Run tests"
run = "npm test"

[tasks.build]
description = "Build project"
depends = ["test"]
run = "npm run build"

[tasks.deploy]
description = "Deploy to production"
depends = ["build"]
run = "./scripts/deploy.sh"

# Custom settings
[settings]
experimental = true
verbose = false
```

## Environment Variables

### Basic Environment Management

```bash
# Set environment variables in config
mise set NODE_ENV=development
mise set API_KEY=secret123

# View environment
mise env
mise env --shell bash
mise env --json

# Export for use in scripts
eval "$(mise env)"

# Execute command with mise environment
mise exec -- node app.js
mise x -- python script.py
mise exec npm:tsx -- tsx app.ts

# Alias for exec (save keystrokes)
alias x="mise x --"
x node app.js
```

### .env File Support

```bash
# Load .env file automatically
# In mise.toml:
[env]
_.file = ".env"

# Or via environment variable
export MISE_ENV_FILE=.env

# Or set path in settings
mise settings set env_file .env
```

### Environment-Specific Configs

```bash
# Create environment configs
touch mise.development.toml
touch mise.production.toml
touch mise.test.toml

# Activate specific environment
export MISE_ENV=development
mise env

export MISE_ENV=production
mise env

# Example environment config
# mise.production.toml
[env]
NODE_ENV = "production"
LOG_LEVEL = "error"
DATABASE_URL = "postgresql://prod-server:5432/app"
```

## Task Runner

### Defining Tasks

```bash
# Simple task
[tasks.hello]
run = "echo 'Hello, World!'"

# Task with description
[tasks.build]
description = "Build the application"
run = "npm run build"

# Multi-line script
[tasks.deploy]
description = "Deploy application"
run = """
#!/bin/bash
set -e
npm run build
npm run test
./deploy.sh
"""

# Task with dependencies
[tasks.deploy]
depends = ["test", "build"]
run = "./deploy.sh"

# Task with environment variables
[tasks.test]
env = { NODE_ENV = "test" }
run = "npm test"

# Task with custom working directory
[tasks.docs]
dir = "./documentation"
run = "mkdocs build"
```

### Running Tasks

```bash
# Run a task
mise run build
mise r build

# List available tasks
mise tasks
mise tasks --extended
mise tasks --json

# Run task with arguments
mise run test -- --coverage
mise r deploy -- --env production

# Run multiple tasks
mise run clean build test

# Run with verbose output
mise run -v build
mise run --log-level debug test

# Background task execution
mise run -b server

# Watch for file changes and re-run
mise watch build
mise watch --glob "src/**/*.ts" build
```

### Advanced Task Features

```bash
# Task with file dependencies
[tasks.build]
sources = ["src/**/*.ts"]
outputs = ["dist/**/*"]
run = "tsc"

# Parallel task execution
[tasks.all]
depends = ["build:client", "build:server", "build:docs"]
parallel = true

# Task aliases
[tasks.b]
alias = "build"

# Task includes from other files
[tasks]
_.includes = ["tasks/*.toml"]

# Task with custom shell
[tasks.script]
shell = "bash -c"
run = "complex bash script"

# Task with tool-specific versions
[tasks.node-build]
tools = ["node@20", "npm@10"]
run = "npm run build"
```

## Shims

### Using Shims

```bash
# Setup shims directory
mise settings set shims_dir ~/.local/share/mise/shims

# Add shims to PATH manually (if not using activation)
export PATH="$HOME/.local/share/mise/shims:$PATH"

# Reshim after installing new tools
mise reshim

# List shims
ls ~/.local/share/mise/shims

# Remove shim
rm ~/.local/share/mise/shims/node

# Note: Shims are symlinks to mise binary
# They work without shell activation
# Good for: CI/CD, IDEs, non-interactive shells
# Limitation: Don't support all features of mise activate
```

## Advanced Usage

### Trust System

```bash
# Trust a directory (allow config execution)
mise trust

# Trust specific file
mise trust ~/projects/myapp/mise.toml

# List trusted configs
mise trust --list

# Untrust a directory
mise trust --untrust

# Auto-trust directories
mise settings set trusted_config_paths ~/.config/mise:~/projects
```

### Multiple Tool Versions

```bash
# Specify multiple versions in project
mise use python@3.11 python@3.12
mise use node@20 node@22

# Set default version
mise use python@3.12 --pin

# List all installed versions
mise ls

# Use version for single command
mise x node@20 -- node app.js
mise exec python@3.11 -- python script.py
```

### Path Management

```bash
# Add custom paths to mise.toml
[env]
_.path = [
  "./node_modules/.bin",
  "./bin"
]

# Prepend to PATH
PATH = ["./custom-bin", "$PATH"]

# View computed PATH
mise env | grep PATH
```

### Hook System

```bash
# Pre-install hook
[hooks]
pre_install = "echo 'Installing...'"

# Post-install hook
post_install = "echo 'Installation complete'"

# Enter directory hook
enter = "./scripts/on-enter.sh"

# Exit directory hook
leave = "./scripts/on-leave.sh"
```

### Watch Mode

```bash
# Watch files and run tasks
mise watch test
mise w test

# Watch specific patterns
mise watch --glob "**/*.ts" build
mise watch -g "src/**/*.py" test

# Exclude patterns
mise watch --glob "!**/*.test.ts" build

# Multiple globs
mise watch -g "src/**/*.ts" -g "!**/*.test.ts" build

# Clear screen on change
mise watch -c build
```

### Cache Management

```bash
# Clear cache
mise cache clear

# Show cache location
mise cache show

# Disable cache
mise settings set cache_enabled false

# Cache specific settings
mise settings set cache_prune_age "30d"
```

### Plugin Management

```bash
# List plugins
mise plugins ls
mise plugins list

# Install plugin
mise plugins install nodejs
mise plugins install python

# Update plugins
mise plugins update
mise plugins update nodejs

# Remove plugin
mise plugins uninstall nodejs

# Link local plugin for development
mise plugins link my-plugin ~/projects/mise-my-plugin
```

### Idiomatic Version Files

```bash
# Enable support for .nvmrc, .node-version, etc.
mise settings set idiomatic_version_file_enable_tools node,python,ruby

# Disable idiomatic version files
mise settings set idiomatic_version_file false

# Supported files:
# - .node-version, .nvmrc (Node.js)
# - .python-version (Python)
# - .ruby-version (Ruby)
# - .terraform-version (Terraform)
# - .java-version (Java)
# - go.mod (Go)
```

## Migration Guides

### From asdf

```bash
# Migrate config automatically
mise migrate

# Manual migration
# .tool-versions → mise.toml conversion
asdf current > .tool-versions
mise use --path .

# Import existing installations
mise install

# Compare environments
asdf current
mise ls --current
```

### From nvm

```bash
# Convert .nvmrc to mise
mise use node@$(cat .nvmrc)

# Or enable idiomatic version file support
mise settings set idiomatic_version_file_enable_tools node

# Migrate global default
nvm current
mise use --global node@$(nvm current)
```

### From pyenv

```bash
# Enable .python-version support
mise settings set idiomatic_version_file_enable_tools python

# Or convert explicitly
mise use python@$(cat .python-version)

# Migrate global version
mise use --global python@$(pyenv global)
```

## Troubleshooting

### Common Issues

```bash
# Debug information
mise doctor
mise doctor --json

# Verbose output
mise --verbose install node
mise -vv ls
mise --log-level trace install

# Check configuration loading
mise cfg show
mise config show

# Verify tool installation
mise which node
mise which python

# View mise environment
mise env

# Reset mise
rm -rf ~/.local/share/mise
rm -rf ~/.config/mise/cache
mise install
```

### Performance Optimization

```bash
# Disable features for faster startup
mise settings set experimental true
mise settings set jobs 8
mise settings set raw true

# Skip rehashing
mise settings set legacy_version_file false

# Reduce plugin updates
mise settings set plugin_autoupdate_interval "7d"
```

### Environment Issues

```bash
# Tool not found
mise which node  # Should show path
mise doctor      # Check for issues
mise ls          # Verify installation

# Path issues
echo $PATH                    # Check PATH
mise env | grep PATH          # Check mise PATH
eval "$(mise activate bash)"  # Re-activate shell

# Config not loading
mise cfg                      # View current config
mise config ls                # List all configs
mise trust                    # Trust if needed
```

## Common Use Cases

### Web Development

```bash
# Full-stack JavaScript project
cd my-webapp
mise use node@22 npm@10 pnpm@8

# mise.toml
[tools]
node = "22"
pnpm = "8"

[env]
NODE_ENV = "development"
PORT = "3000"

[tasks.dev]
run = "pnpm dev"

[tasks.build]
run = "pnpm build"

[tasks.preview]
depends = ["build"]
run = "pnpm preview"
```

### Python Data Science

```bash
# Data science environment
mise use python@3.12 pipx:jupyter pipx:pandas

# mise.toml
[tools]
python = "3.12"
"pipx:jupyter" = "latest"
"pipx:pandas" = "latest"

[env]
JUPYTER_CONFIG_DIR = ".jupyter"

[tasks.notebook]
run = "jupyter notebook"

[tasks.lab]
run = "jupyter lab"
```

### DevOps & Infrastructure

```bash
# Infrastructure tooling
mise use terraform@1.6 kubectl@1.28 helm@3 aws-cli@2

# mise.toml
[tools]
terraform = "1.6"
kubectl = "1.28"
helm = "3"
aws-cli = "2"

[env]
AWS_REGION = "us-west-2"
KUBECONFIG = "./kubeconfig"

[tasks.plan]
run = "terraform plan"

[tasks.apply]
depends = ["plan"]
run = "terraform apply"

[tasks.k8s-deploy]
run = "kubectl apply -f manifests/"
```

### Monorepo Setup

```bash
# Root mise.toml
[tools]
node = "22"
pnpm = "8"

# apps/frontend/mise.toml
[tools]
node = "22"
"npm:vite" = "5"

[tasks.dev]
run = "pnpm dev"

# apps/backend/mise.toml
[tools]
node = "20"  # Different version for backend

[tasks.dev]
run = "pnpm start:dev"
```

### CI/CD Integration

```bash
# GitHub Actions
# .github/workflows/ci.yml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: jdx/mise-action@v2
      - run: mise install
      - run: mise run build
      - run: mise run test

# GitLab CI
# .gitlab-ci.yml
before_script:
  - curl https://mise.run | sh
  - export PATH="$HOME/.local/bin:$PATH"
  - mise install

build:
  script:
    - mise run build

test:
  script:
    - mise run test
```

## Pro Tips

### Productivity Shortcuts

```bash
# Alias for common commands
alias m="mise"
alias mr="mise run"
alias mx="mise exec"
alias mi="mise install"
alias mu="mise use"

# Quick task execution
alias x="mise x --"
x node app.js
x python script.py

# Project switcher with auto-activation
function cdp() {
  cd ~/projects/$1 && mise activate
}
```

### Team Collaboration

```bash
# Commit mise.toml to version control
git add mise.toml
git commit -m "Add mise configuration"

# Add .mise.local.toml to .gitignore for personal overrides
echo "mise.local.toml" >> .gitignore

# Document mise usage in README
echo "## Development Setup" >> README.md
echo "1. Install mise: https://mise.jdx.dev" >> README.md
echo "2. Run: mise install" >> README.md
echo "3. Start dev server: mise run dev" >> README.md
```

### Custom Tool Backends

```bash
# Create custom backend plugin
mkdir -p ~/.local/share/mise/plugins/my-tool
cd ~/.local/share/mise/plugins/my-tool

# Create bin/list-all script
cat > bin/list-all << 'EOF'
#!/usr/bin/env bash
curl -s https://api.github.com/repos/user/tool/releases | 
  grep tag_name | 
  sed 's/.*"v\(.*\)".*/\1/'
EOF
chmod +x bin/list-all

# Create bin/install script
cat > bin/install << 'EOF'
#!/usr/bin/env bash
version=$1
install_path=$2
# Download and install logic
EOF
chmod +x bin/install

# Use custom backend
mise use my-tool@1.0.0
```

### Performance Monitoring

```bash
# Time mise operations
time mise install
time mise activate bash

# Profile mise startup
mise --log-level trace activate bash 2>&1 | grep -E "took|duration"

# Check cache hits
mise cache show
```

### Directory-Specific Configs

```bash
# Work projects use stable versions
~/work/mise.toml:
[tools]
node = "20"  # LTS
python = "3.11"

# Personal projects use latest
~/personal/mise.toml:
[tools]
node = "22"  # Latest
python = "3.12"

# Cascade behavior:
# ~/personal/project/mise.toml overrides ~/personal/mise.toml
# which overrides ~/.config/mise/config.toml
```

## Resources

- **Official Documentation**: https://mise.jdx.dev
- **GitHub Repository**: https://github.com/jdx/mise
- **Tool Registry**: https://mise.jdx.dev/registry.html
- **GitHub Discussions**: https://github.com/jdx/mise/discussions
- **Discord Community**: https://discord.gg/mise
- **Comparison with asdf**: https://mise.jdx.dev/comparison-to-asdf.html
- **FAQ**: https://mise.jdx.dev/faq.html

## Cheat Sheet Summary

```bash
# Installation
curl https://mise.run | sh

# Activation
eval "$(mise activate bash)"

# Install tools
mise use --global node@22 python@3.12

# Project setup
cd myproject
mise use node@22
mise install

# Environment
mise env
mise set KEY=value

# Tasks
mise run build
mise run test
mise tasks

# Management
mise ls                    # List installed
mise ls-remote node        # Available versions
mise upgrade               # Update all tools
mise doctor                # Diagnostics

# Quick execution
mise exec -- node app.js
mise x -- python script.py
```
