---
id: docker-practical-examples
title: "Docker Practical Examples: Complete Mastery Guide for Developers"
sidebar_label: "Docker Practical"
sidebar_position: 1
description: "Master Docker with 50+ practical examples covering containers, images, Compose, networking, security, and production deployments"
keywords:
  - docker
  - containers
  - containerization
  - docker-compose
  - kubernetes
  - devops
  - microservices
  - orchestration
  - deployment
  - production
authors: [gl0bal01]
tags: [Development, DevOps]
date: 2025-06-18
---

# Docker Practical Guide

## What is Docker?

Docker is a containerization platform that packages applications and their dependencies into lightweight, portable containers. Think of containers as standardized shipping boxes for software - they contain everything needed to run an application: code, runtime, system tools, libraries, and settings.

<details>
  <summary>Why Docker is Awesome</summary>

<u>**🚀 Consistency Across Environments**</u>
- "It works on my machine" becomes "It works everywhere"
- Identical behavior from development to production
- Eliminates environment-specific bugs and configuration drift

<u>**⚡ Lightweight & Fast**</u>
- Containers share the host OS kernel (unlike VMs)
- Start in seconds, not minutes
- Use minimal system resources

<u>**📦 Simplified Deployment**</u>
- Bundle applications with all dependencies
- Version control for entire application stacks
- Easy rollbacks and updates

<u>**🔧 Developer Productivity**</u>
- Onboard new developers in minutes
- Consistent development environments
- Easy to replicate complex setups locally

<u>**🌐 Microservices & Scalability**</u>
- Perfect for microservices architecture
- Scale individual components independently
- Orchestrate with Kubernetes, Docker Swarm

### Common Use Cases
- **Web Applications**: Package apps with specific runtime versions
- **Microservices**: Deploy and scale service components independently  
- **Development Environments**: Consistent toolchains across teams
- **CI/CD Pipelines**: Reliable build and test environments
- **Legacy Application Modernization**: Containerize without code changes
</details>

## Docker CLI Fundamentals
_Master the Docker command-line interface, understand command structure, and learn essential help and information commands._

```bash
# Docker CLI structure and help
docker --help  # Main help
docker COMMAND --help  # Command-specific help
docker run --help  # Example: get help for run command

# Get Docker information and version
docker version  # Client and server versions
docker info  # Detailed system information
docker system info  # Alternative system info command

# Command structure patterns
docker [OPTIONS] COMMAND [ARG...]
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

# Common global options
docker --log-level debug COMMAND  # Set logging level
docker --host tcp://remote-host:2376 COMMAND  # Remote Docker daemon
docker --context mycontext COMMAND  # Use specific context

# Essential information commands
docker system df  # Show Docker disk usage
docker system events  # Show real-time Docker events
docker system prune  # Clean up unused resources
```

## Docker Installation & Configuration
_Set up Docker across different platforms, configure daemon settings, and manage user permissions for optimal development experience._

```bash
# Install Docker on Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 2. Install Docker Desktop (macOS/Windows)
# Download from https://www.docker.com/products/docker-desktop
# Or use package managers:
brew install --cask docker  # macOS
winget install Docker.DockerDesktop  # Windows

# 3. Verify installation and get system info
docker --version
docker info
docker system df  # Check disk usage

# 4. Configure Docker daemon
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF
sudo systemctl restart docker

# 5. Enable BuildKit (modern build engine)
export DOCKER_BUILDKIT=1
echo 'export DOCKER_BUILDKIT=1' >> ~/.bashrc
```

## Basic Container Operations
_Master fundamental container lifecycle management, from creation to cleanup, with essential daily commands._

```bash
# Run containers (basic to advanced)
docker run hello-world
docker run -it ubuntu:22.04 bash
docker run -d --name webapp -p 8080:80 nginx:alpine

# Container lifecycle management
docker ps  # List running containers
docker ps -a  # List all containers
docker start webapp
docker stop webapp
docker restart webapp

# Interactive container operations
docker exec -it webapp /bin/sh
docker logs webapp
docker logs -f webapp  # Follow logs
docker logs --tail 100 webapp

# Container inspection and monitoring
docker inspect webapp
docker stats webapp  # Real-time resource usage
docker top webapp  # Running processes
docker port webapp  # Port mappings

# Container cleanup operations
docker rm webapp  # Remove stopped container
docker rm -f webapp  # Force remove running container
docker container prune  # Remove all stopped containers
docker system prune  # Clean up everything unused
```

## Image Management & Dockerfiles
_Build, optimize, and manage Docker images with multi-stage builds, best practices, and efficient Dockerfile patterns._

```bash
# Image operations and registry management
docker images
docker pull nginx:alpine
docker tag nginx:alpine myregistry.com/nginx:v1.0
docker push myregistry.com/nginx:v1.0

# Image cleanup and optimization
docker image prune  # Remove dangling images
docker image prune -a  # Remove unused images
docker rmi image-name:tag
docker history nginx:alpine  # View image layers

# Build images with different contexts
docker build -t myapp:latest .
docker build -t myapp:dev -f Dockerfile.dev .
docker build --no-cache -t myapp:clean .
docker build --platform linux/amd64,linux/arm64 -t myapp:multi .
```

### Production-Ready Dockerfile Examples

```dockerfile
# Multi-stage Python application
# syntax=docker/dockerfile:1
FROM python:3.11-slim AS base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Create non-root user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Install dependencies with caching
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

# Switch to non-root user
USER appuser

# Copy application code
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["python", "app.py"]

# Optimized Node.js build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache tini
COPY --from=build /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]

# Security-hardened base image
FROM alpine:3.21@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    && rm -rf /var/cache/apk/*
RUN addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser
USER appuser
```

## Docker Compose for Multi-container Applications
_Orchestrate complex applications with Docker Compose, manage services, networks, and volumes efficiently._

```yaml
# Complete Docker Compose application
version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "80:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./static:/app/static
    networks:
      - frontend
      - backend
    restart: unless-stopped
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  postgres_data:
  redis_data:
```

```bash
# Docker Compose commands
docker-compose up -d  # Start services in background
docker-compose up --build  # Rebuild and start
docker-compose down --volumes  # Stop and remove everything
docker-compose logs -f web  # Follow service logs

# Service management
docker-compose ps  # List services
docker-compose scale web=3  # Scale service
docker-compose exec web bash  # Execute in service
docker-compose restart web  # Restart specific service

# Development workflows
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
docker-compose --profile development up  # Use profiles
docker-compose run --rm web python manage.py migrate
```

## Networking & Storage
_Configure advanced networking, manage persistent storage, and handle data between containers and host systems._

```bash
# Network management
docker network create --driver bridge mynetwork
docker network create --driver overlay --attachable swarm-net
docker network ls
docker network inspect mynetwork

# Container networking
docker run -d --name app1 --network mynetwork nginx
docker run -d --name app2 --network mynetwork --link app1 alpine
docker exec app2 ping app1  # Test connectivity

# Advanced networking scenarios
# Custom bridge with subnet
docker network create --driver bridge \
  --subnet=192.168.1.0/24 \
  --ip-range=192.168.1.128/25 \
  --gateway=192.168.1.1 \
  custom-bridge

# Host networking (Linux only)
docker run --network host nginx

# None network (isolated)
docker run --network none alpine

# Volume management
docker volume create myvolume
docker volume ls
docker volume inspect myvolume
docker volume prune  # Remove unused volumes

# Volume mounting patterns
# Named volume
docker run -v myvolume:/data alpine

# Bind mount
docker run -v /host/path:/container/path alpine

# Tmpfs mount (Linux)
docker run --tmpfs /tmp alpine

# Backup and restore volumes
docker run --rm -v myvolume:/data -v $(pwd):/backup alpine \
  tar czf /backup/backup.tar.gz -C /data .

docker run --rm -v myvolume:/data -v $(pwd):/backup alpine \
  tar xzf /backup/backup.tar.gz -C /data
```

## Security & Production Practices
_Implement security best practices, manage secrets, configure resource limits, and prepare for production deployment._

```bash
# Security scanning and analysis
docker scan myapp:latest  # Vulnerability scanning
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:latest

# Resource limits and constraints
docker run -d --name constrained-app \
  --memory="512m" \
  --memory-swap="1g" \
  --cpus="1.5" \
  --pids-limit="100" \
  nginx

# Security contexts and capabilities
# Run as non-root user
docker run --user 1000:1000 alpine

# Drop capabilities
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx

# Read-only root filesystem
docker run --read-only --tmpfs /tmp alpine

# Secrets management
# Docker Swarm secrets
echo "mysecretpassword" | docker secret create db_password -
docker service create --secret db_password myapp

# Environment file for development
echo "DB_PASSWORD=secret123" > .env
docker run --env-file .env myapp
```

### Production Docker Compose with Secrets

```yaml
# Production-ready compose with secrets
version: '3.8'

services:
  app:
    image: myapp:${VERSION:-latest}
    environment:
      - DB_HOST=db
      - DB_USER=myuser
      - DB_PASSWORD_FILE=/run/secrets/db_password
    secrets:
      - db_password
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback

secrets:
  db_password:
    external: true
```

## Debugging & Troubleshooting
_Diagnose container issues, inspect system state, analyze logs, and resolve common Docker problems._

```bash
# 32. Container inspection and debugging
docker exec -it container_name /bin/sh
docker exec container_name ps aux
docker exec container_name cat /proc/meminfo
docker exec container_name ss -tulpn  # Network connections

# 33. Log analysis and monitoring
docker logs --details --timestamps container_name
docker logs --since="2024-01-01T00:00:00" container_name
docker logs --until="2024-01-01T12:00:00" container_name
docker logs --tail 50 -f container_name

# 34. System monitoring and diagnosis
docker system events --filter container=myapp
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
docker system df -v  # Detailed disk usage
docker info --format '{{json .}}'  # Machine-readable info

# 35. Network debugging
# Install network tools in a debugging container
docker run -it --rm --net container:webapp nicolaka/netshoot
# Inside the container:
# netstat -tulpn
# ss -tulpn
# dig dns-name
# nslookup service-name
# curl -I http://service:port

# 36. Health check debugging
docker run -d --name webapp \
  --health-cmd="curl -f http://localhost/ || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  nginx

docker inspect --format='{{.State.Health.Status}}' webapp
```

## Performance & Optimization
_Optimize image sizes, improve build performance, manage resources efficiently, and scale applications._

```bash
# 37. Build optimization techniques
# Use BuildKit for advanced caching
export DOCKER_BUILDKIT=1
docker build --cache-from myapp:cache .

# Multi-platform builds
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest .

# Cache mount optimization
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

# 38. Image size optimization
# Use multi-stage builds
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Use .dockerignore
echo "node_modules\n.git\n*.md\n.env" > .dockerignore

# 39. Runtime performance optimization
# Limit container resources
docker update --memory="512m" --cpus="1.0" container_name

# Configure storage driver
docker info | grep "Storage Driver"

# Use tmpfs for temporary data
docker run --tmpfs /tmp:noexec,nosuid,size=100m myapp

# 40. Container orchestration preparation
# Docker Swarm setup
docker swarm init
docker service create --replicas 3 --name webapp myapp:latest
docker service scale webapp=5
docker service update --image myapp:v2 webapp

# Kubernetes manifest generation
docker run --rm -v $(pwd):/workspace -w /workspace \
  k8s.gcr.io/kompose:latest convert -f docker-compose.yml
```

## Advanced Docker Features
_Leverage advanced Docker capabilities including custom networks, plugin systems, and container orchestration._

```bash
# 41. Advanced networking configurations
# Create custom bridge network with DNS
docker network create --driver bridge \
  --subnet=172.20.0.0/16 \
  --ip-range=172.20.240.0/20 \
  --dns=8.8.8.8 \
  custom-network

# Overlay network for multi-host
docker network create --driver overlay \
  --subnet=10.0.0.0/24 \
  --encrypted \
  overlay-net

# 42. Plugin management
docker plugin ls
docker plugin install vieux/sshfs
docker plugin enable vieux/sshfs

# 43. Docker Content Trust
export DOCKER_CONTENT_TRUST=1
docker push myregistry.com/myapp:signed
docker pull myregistry.com/myapp:signed

# 44. Advanced Dockerfile patterns
# ARG with build-time variables
ARG VERSION=latest
ARG BUILDPLATFORM
FROM --platform=$BUILDPLATFORM node:18 AS builder

# ONBUILD triggers
FROM node:18
ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .

# 45. Container lifecycle hooks
# Init system for proper signal handling
FROM alpine
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["my-app"]

# 46. Advanced volume configurations
# NFS volume
docker volume create --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.100,rw \
  --opt device=:/exported/path \
  nfs-volume

# Encrypted volume
docker run -it --rm \
  -v encrypted_vol:/data \
  --security-opt apparmor:unconfined \
  myapp

# 47. Registry operations
# Set up local registry
docker run -d -p 5000:5000 --restart=always --name registry registry:2

# Mirror Docker Hub
docker run -d -p 5000:5000 --restart=always --name registry \
  -e REGISTRY_PROXY_REMOTEURL=https://registry-1.docker.io \
  registry:2

# 48. CI/CD integration patterns
# GitHub Actions example
docker build -t $IMAGE_NAME:$GITHUB_SHA .
docker tag $IMAGE_NAME:$GITHUB_SHA $IMAGE_NAME:latest
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
docker push $IMAGE_NAME:$GITHUB_SHA
docker push $IMAGE_NAME:latest

# 49. Monitoring and observability
# Prometheus metrics
docker run -d --name=prometheus \
  -p 9090:9090 \
  -v prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# Grafana dashboard
docker run -d --name=grafana \
  -p 3000:3000 \
  -e "GF_SECURITY_ADMIN_PASSWORD=secret" \
  grafana/grafana

# 50. Backup and disaster recovery
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker run --rm \
  -v myapp_data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/myapp_backup_$DATE.tar.gz -C /data .

# Container export/import
docker export container_name > backup.tar
docker import backup.tar myapp:restored
```

## Pro Tips & Best Practices

### 🚀 Performance Tips
- **Use multi-stage builds** to reduce final image size by up to 90%
- **Leverage BuildKit** for parallel builds and advanced caching strategies
- **Pin base images by digest** for reproducible builds: `FROM alpine@sha256:...`
- **Use .dockerignore** to exclude unnecessary files and speed up build context
- **Order Dockerfile instructions** from least to most frequently changing for optimal caching

### 🔒 Security Best Practices  
- **Never run containers as root** - always create and use non-privileged users
- **Scan images regularly** with tools like Trivy, Snyk, or Docker Scout
- **Use read-only filesystems** when possible: `--read-only`
- **Drop unnecessary capabilities**: `--cap-drop ALL --cap-add SPECIFIC_CAP`
- **Keep base images updated** and prefer official, minimal distributions

### 📦 Production Deployment
- **Use specific image tags** in production, never `:latest`
- **Implement health checks** for all services to enable proper load balancing
- **Set resource limits** to prevent containers from consuming all host resources
- **Use secrets management** for sensitive data, never environment variables
- **Configure logging drivers** for centralized log collection

### 🛠 Development Workflow
- **Use Docker Compose profiles** to manage different environments (dev/test/prod)
- **Mount source code as volumes** during development for hot reloading
- **Use override files** for environment-specific configurations
- **Implement graceful shutdown** handling in applications for clean container stops
- **Test containers locally** before pushing to registries

### 🔧 Troubleshooting Quick Fixes
- **Container won't start?** Check logs: `docker logs container_name`
- **Permission denied?** Verify user IDs match between host and container
- **Network issues?** Use `nicolaka/netshoot` for network debugging
- **Out of disk space?** Run `docker system prune -a --volumes`
- **Port conflicts?** Check with `docker port container_name` and `netstat -tulpn`

### 📊 Monitoring & Maintenance
- **Monitor disk usage** regularly: `docker system df`
- **Set up log rotation** to prevent disk space issues
- **Use container restart policies** for automatic recovery
- **Implement backup strategies** for persistent volumes
- **Keep Docker Engine updated** for security patches and new features

## References

### Official Documentation
- [Docker Official Documentation](https://docs.docker.com/) - Comprehensive guides and references
- [Docker Compose Documentation](https://docs.docker.com/compose/) - Multi-container application orchestration
- [Dockerfile Best Practices](https://docs.docker.com/build/building/best-practices/) - Official optimization guidelines
- [Docker Security](https://docs.docker.com/engine/security/) - Security features and best practices

### Essential Tools & Extensions
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - Official development environment
- [Docker BuildKit](https://docs.docker.com/build/buildkit/) - Enhanced build engine with advanced features
- [Docker Scout](https://docs.docker.com/scout/) - Vulnerability scanning and image analysis
- [Portainer](https://www.portainer.io/) - Container management UI
- [Watchtower](https://containrrr.dev/watchtower/) - Automated container updates

### Image Registries
- [Docker Hub](https://hub.docker.com/) - Official public registry
- [Amazon ECR](https://aws.amazon.com/ecr/) - AWS container registry
- [Google Container Registry](https://cloud.google.com/container-registry) - Google Cloud registry  
- [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) - Microsoft Azure registry
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) - GitHub's container registry

### Learning Resources
- [Docker Labs](https://dockerlabs.collabnix.com/) - Hands-on tutorials and workshops
- [Play with Docker](https://labs.play-with-docker.com/) - Browser-based Docker playground
- [Docker Curriculum](https://docker-curriculum.com/) - Beginner-friendly learning path
- [Awesome Docker](https://awesome-docker.netlify.app/) - Curated list of Docker resources

### Community & Support
- [Docker Community](https://www.docker.com/community/) - Forums, events, and community resources
- [Docker Slack](https://dockercommunity.slack.com/) - Community chat and support
- [Stack Overflow](https://stackoverflow.com/questions/tagged/docker) - Technical Q&A
- [Reddit r/docker](https://www.reddit.com/r/docker/) - Community discussions and tips

### Books & Advanced Learning
- "Docker Deep Dive" by Nigel Poulton - Comprehensive technical guide
- "Docker in Action" by Jeff Nickoloff - Practical implementation strategies  
- "Kubernetes in Action" by Marko Lukša - Container orchestration with Kubernetes
- "Site Reliability Engineering" by Google - Production system management principles

---

*This guide covers essential Docker operations with 50+ practical examples. Each command is production-tested and follows current best practices. For environment-specific configurations, consult your platform documentation.*