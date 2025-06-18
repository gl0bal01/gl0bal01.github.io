---
id: github-guide
title: "Comprehensive GitHub Development Operations: A Technical Reference Manual"
sidebar_label: "Technical Reference"
sidebar_position: 1
description: "An exhaustive academic reference analyzing GitHub platform capabilities, command-line tools, automation frameworks, and enterprise integration for modern software development operations"
keywords:
  - github
  - git
  - github cli
  - github actions
  - devops
  - automation
  - version control
  - ci cd
  - collaboration
  - repository management
authors: [gl0bal01]
tags: [Development, Productivity]
date: 2024-06-18
---

# Comprehensive GitHub Development Operations: A Technical Reference Manual

## Abstract

This comprehensive technical reference presents an exhaustive analysis of GitHub platform capabilities, command-line interfaces, automation frameworks, and enterprise integration methodologies employed in modern software development operations. We examine the complete GitHub ecosystem including Git fundamentals, GitHub CLI operations, Actions workflows, API integration, and advanced collaboration patterns. This manual serves as both theoretical foundation and practical implementation guide for software engineers, DevOps practitioners, and platform administrators.

## 1. Introduction

GitHub represents the foundational platform for modern collaborative software development, providing distributed version control, project management, automation pipelines, and enterprise-grade collaboration tools. This methodology enables teams to leverage comprehensive development workflows spanning code hosting, review processes, continuous integration, deployment automation, and project governance.

### 1.1 GitHub Ecosystem Taxonomy

GitHub development operations can be systematically categorized into six primary domains:

1. **Repository Management**: Git-based version control and project organization
2. **Collaboration Workflows**: Pull requests, issues, discussions, and code review
3. **Automation Pipelines**: GitHub Actions for CI/CD and workflow automation
4. **Command-Line Operations**: GitHub CLI for terminal-based platform interaction
5. **API Integration**: REST and GraphQL APIs for programmatic platform access
6. **Enterprise Administration**: Organization management, security, and compliance

### 1.2 Platform Architecture Overview

The following diagram illustrates typical GitHub development workflows and integration points:

```mermaid
graph TD
    A[Developer Workstation] --> B[Local Git Repository]
    A --> C[GitHub CLI]
    A --> D[GitHub API]
    
    B --> E[Remote Repository]
    C --> E
    D --> E
    
    E --> F[Pull Requests]
    E --> G[Issues & Projects]
    E --> H[GitHub Actions]
    
    F --> I[Code Review]
    F --> J[Automated Checks]
    
    G --> K[Project Management]
    G --> L[Issue Tracking]
    
    H --> M[CI/CD Pipelines]
    H --> N[Automation Workflows]
    H --> O[Deployment]
    
    I --> P[Merge to Main]
    J --> P
    M --> P
    
    P --> Q[Production Release]
    
    style A fill:#ff9999
    style E fill:#99ccff
    style H fill:#99ffcc
    style Q fill:#ffcccc
```

### 1.3 Tool Evaluation Framework

Each GitHub operation methodology is evaluated across eight critical dimensions:

| Tool/Method | Efficiency | Learning Curve | Integration | Automation | Scalability | Security | Maintenance | Enterprise |
|-------------|------------|----------------|-------------|------------|-------------|----------|-------------|------------|
| Git CLI | Very High | High | High | High | Very High | High | Low | Very High |
| GitHub CLI | High | Medium | Very High | Very High | High | High | Low | High |
| GitHub Actions | Very High | Medium | Very High | Very High | Very High | Very High | Medium | Very High |
| GitHub API | Very High | High | Very High | Very High | Very High | High | Medium | Very High |
| GitHub Desktop | Medium | Low | Medium | Low | Medium | High | Low | Medium |
| Web Interface | Low | Very Low | Low | Very Low | Low | High | Very Low | High |

:::note Evaluation Criteria
Evaluation criteria are based on enterprise software development best practices, developer productivity metrics, and platform adoption patterns. Ratings represent relative assessments under typical development scenarios and may vary based on specific organizational requirements, team expertise, and integration complexity.
:::

### 1.4 Workflow Selection Decision Framework

The following flowchart provides a systematic approach for selecting appropriate GitHub workflows based on operational requirements:

```mermaid
flowchart TD
    A[GitHub Operation Required] --> B{Operation Type?}
    
    B -->|Code Management| C{Team Size?}
    B -->|Automation| D{Complexity Level?}
    B -->|Collaboration| E{Review Requirements?}
    B -->|Administration| F{Enterprise Features?}
    
    C -->|Individual| G[Git CLI + Local Workflow]
    C -->|Small Team| H[GitHub CLI + Pull Requests]
    C -->|Large Team| I[Branching Strategy + Reviews]
    
    D -->|Simple| J[Basic GitHub Actions]
    D -->|Complex| K[Advanced Workflows + API]
    D -->|Enterprise| L[Actions + Self-hosted Runners]
    
    E -->|Basic| M[Standard Pull Requests]
    E -->|Rigorous| N[Protected Branches + CODEOWNERS]
    E -->|Compliance| O[Required Checks + Approvals]
    
    F -->|Standard| P[GitHub Team/Enterprise]
    F -->|Advanced| Q[Enterprise + SAML/SCIM]
    F -->|Custom| R[GitHub Enterprise Server]
    
    G --> S[Implementation]
    H --> S
    I --> S
    J --> S
    K --> S
    L --> S
    M --> S
    N --> S
    O --> S
    P --> S
    Q --> S
    R --> S
    
    style A fill:#e1f5fe
    style S fill:#c8e6c9
    style K fill:#fff3e0
    style L fill:#fff3e0
    style Q fill:#f3e5f5
    style R fill:#f3e5f5
```

## 2. Git Foundation: Version Control Mastery

:::note Prerequisites
The following Git commands assume you have Git installed (version 2.20+) and properly configured with your identity. Replace placeholder values (e.g., username, repository names, URLs) with those specific to your environment. Ensure you have appropriate permissions for remote repositories.
:::

Git forms the foundational layer of GitHub operations, providing distributed version control capabilities that enable collaborative software development at scale.

### 2.1 Repository Initialization and Configuration

```bash
# Initialize new repository with main as default branch
git init -b main

# Initialize in new directory
git init my-project -b main
cd my-project

# Configure user identity (local repository)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Configure identity globally
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set up default branch name globally
git config --global init.defaultBranch main

# Configure line ending handling
git config --global core.autocrlf input  # Linux/macOS
git config --global core.autocrlf true   # Windows

# Configure editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim

# View configuration
git config --list
git config --global --list
git config --local --list
```

### 2.2 Remote Repository Management

```bash
# Add remote repository
git remote add origin https://github.com/username/repository.git

# Add remote with SSH URL
git remote add origin git@github.com:username/repository.git

# View configured remotes
git remote -v

# Change remote URL (HTTPS to SSH)
git remote set-url origin git@github.com:username/repository.git

# Change remote URL (SSH to HTTPS)
git remote set-url origin https://github.com/username/repository.git

# Add upstream for forked repositories
git remote add upstream https://github.com/original-owner/repository.git

# Rename remote
git remote rename origin backup
git remote rename backup origin

# Remove remote
git remote remove backup

# Fetch from specific remote
git fetch origin
git fetch upstream

# Show remote information
git remote show origin
```

### 2.3 Staging and Commit Operations

```bash
# Stage files for commit
git add file.txt
git add src/
git add .
git add -A  # All files including deletions

# Interactive staging
git add -i
git add -p  # Patch mode for partial staging

# Unstage files
git reset HEAD file.txt
git restore --staged file.txt  # Git 2.23+

# Commit changes
git commit -m "Add user authentication feature"

# Commit with detailed message
git commit -m "Add user authentication" -m "- Implement JWT token validation
- Add password hashing with bcrypt
- Create user session management
- Add logout functionality"

# Commit all tracked changes
git commit -am "Fix authentication bug"

# Amend last commit
git commit --amend -m "Updated commit message"

# Commit with specific date
git commit --date="2024-01-15T10:30:00" -m "Backdated commit"

# Empty commit (useful for triggering CI/CD)
git commit --allow-empty -m "Trigger deployment"

# Sign commits with GPG
git commit -S -m "Signed commit"
git config --global commit.gpgsign true  # Always sign
```

### 2.4 Branch Management Strategies

Branch: Independent line of development within a repository. It allows parallel work on features, fixes, or experiments without affecting the main codebase.

```bash
# Create and switch to new branch
git checkout -b feature/user-dashboard
git switch -c feature/user-dashboard  # Git 2.23+

# Create branch from specific commit
git checkout -b hotfix/security-patch abc1234

# Switch between branches
git checkout main
git switch main  # Git 2.23+

# List branches
git branch
git branch -a   # Including remote branches
git branch -r   # Remote branches only

# Delete branch
git branch -d feature/completed-feature
git branch -D feature/abandoned-feature  # Force delete

# Delete remote branch
git push origin --delete feature/old-feature

# Rename current branch
git branch -m new-branch-name

# Rename other branch
git branch -m old-name new-name

# Track remote branch
git checkout -b local-branch origin/remote-branch
git branch --set-upstream-to=origin/main main

# Show branch relationships
git show-branch
git log --oneline --graph --all --decorate
```

### 2.5 Advanced Merge and Rebase Operations

```bash
# Merge feature branch into main
git checkout main
git merge feature/user-dashboard

# Fast-forward merge only
git merge --ff-only feature/user-dashboard

# No fast-forward merge (always create merge commit)
git merge --no-ff feature/user-dashboard

# Squash merge (combine all commits into one)
git merge --squash feature/user-dashboard
git commit -m "Add user dashboard feature"

# Interactive rebase for commit cleanup
git rebase -i HEAD~3
git rebase -i abc1234

# Rebase branch onto main
git checkout feature/user-dashboard
git rebase main

# Continue/abort rebase
git rebase --continue
git rebase --abort

# Cherry-pick specific commits
git cherry-pick abc1234
git cherry-pick abc1234..def5678

# Three-way merge with custom strategy
git merge -X ours feature/conflicted-branch
git merge -X theirs feature/conflicted-branch
```

### 2.6 Conflict Resolution Techniques

```bash
# Check conflict status
git status
git diff

# View conflicts in specific file
git diff HEAD file.txt

# Use merge tools
git mergetool
git mergetool --tool=vimdiff

# Resolve conflicts manually then mark as resolved
# Edit conflicted files, then:
git add conflicted-file.txt

# Abort merge if needed
git merge --abort

# Show merge conflicts with context
git log --merge
git show :1:filename  # Common ancestor
git show :2:filename  # Current branch
git show :3:filename  # Merging branch

# Automatically resolve conflicts favoring one side
git checkout --ours file.txt    # Keep current branch version
git checkout --theirs file.txt  # Keep merging branch version
```

### 2.7 History Management and Navigation

```bash
# View commit history
git log
git log --oneline
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>'

# View specific branch history
git log main..feature/branch

# Show file history
git log -p filename
git log --follow filename  # Track through renames

# Show who changed what
git blame filename
git annotate filename

# Find commits by message
git log --grep="fix bug"
git log --grep="feature" --grep="bug" --all-match

# Find commits by author
git log --author="John Doe"
git log --since="2024-01-01" --until="2024-12-31"

# Show changes between commits
git diff abc1234..def5678
git diff HEAD~1..HEAD

# Reset to previous state
git reset --soft HEAD~1   # Keep changes staged
git reset --mixed HEAD~1  # Keep changes unstaged (default)
git reset --hard HEAD~1   # Discard all changes

# Reflog for recovery
git reflog
git reset --hard HEAD@{5}
```

### 2.8 Stashing and Temporary Storage

Temporarily saves uncommitted changes, allowing you to switch branches or perform other operations without losing work.


```bash
# Stash current changes temporarily
git stash
git stash push -m "Work in progress on authentication"

# Stash including untracked files
git stash -u
git stash --include-untracked

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{2}

# Pop stash (apply and remove)
git stash pop

# Show stash contents
git stash show
git stash show -p stash@{1}

# Create branch from stash
git stash branch new-feature stash@{1}

# Drop stash
git stash drop stash@{1}

# Clear all stashes
git stash clear
```

## 3. GitHub Repository Management

:::note Repository Operations
The following examples assume you have appropriate permissions for the repositories mentioned. Replace organization names, repository names, and URLs with your actual values. Some operations require specific GitHub permissions or organization settings.
:::

GitHub repository management encompasses creation, configuration, collaboration settings, and maintenance of code repositories with advanced features for team collaboration.

### 3.1 Repository Creation and Setup

```bash
# Create repository using GitHub CLI
gh repo create my-new-project
gh repo create my-new-project --public
gh repo create my-new-project --private
gh repo create my-new-project --internal

# Create with template
gh repo create my-project --template owner/template-repo

# Create with description and website
gh repo create my-project \
  --description "A sample project" \
  --homepage "https://myproject.com"

# Create and clone locally
gh repo create my-project --clone

# Create from existing local repository
cd existing-project
gh repo create --source=. --public --push

# Fork repository
gh repo fork owner/repository
gh repo fork owner/repository --clone

# Clone repository
git clone https://github.com/owner/repository.git
gh repo clone owner/repository

# Clone with specific depth
git clone --depth 1 https://github.com/owner/repository.git

# Clone specific branch
git clone -b development https://github.com/owner/repository.git
```

### 3.2 Repository Configuration and Settings

```bash
# View repository information
gh repo view
gh repo view owner/repository

# Edit repository settings
gh repo edit --description "Updated description"
gh repo edit --homepage "https://newsite.com"
gh repo edit --visibility private

# Archive repository
gh repo archive owner/repository

# Delete repository (with confirmation)
gh repo delete owner/repository --confirm

# Transfer repository
gh repo transfer owner/repository new-owner

# Set default branch
gh repo edit --default-branch main

# Enable/disable features
gh repo edit --enable-issues
gh repo edit --disable-wiki
gh repo edit --enable-projects
gh repo edit --enable-discussions

# Manage topics
gh repo edit --add-topic "javascript,frontend,react"
gh repo edit --remove-topic "old-topic"
```

### 3.3 Collaboration and Access Management

```bash
# Add collaborator
gh repo collaborator add username

# Remove collaborator
gh repo collaborator remove username

# List collaborators
gh repo collaborator list

# Invite collaborator with specific permission
gh repo invite username --permission write

# View pending invitations
gh repo invite list

# Create team (organization)
gh team create development --description "Development team"

# Add team to repository
gh team add-repo organization/development owner/repository --permission admin

# Manage branch protection
gh repo protection enable main
gh repo protection enable main --required-status-checks ci/build
gh repo protection enable main --required-reviews 2
gh repo protection enable main --dismiss-stale-reviews
gh repo protection enable main --restrict-pushes --push-allowances "team:admins"

# Manage repository secrets
gh secret set SECRET_NAME --body "secret-value"
gh secret set SECRET_NAME < secret-file.txt
gh secret list
gh secret delete SECRET_NAME

# Manage environments
gh environment create production
gh environment create staging --protection-rules '{"required_reviewers":[{"type":"User","id":"username"}]}'
```

### 3.4 File and Content Management

```bash
# Add file to repository via CLI
echo "# My Project" > README.md
git add README.md
git commit -m "Add README"
git push origin main

# Create and commit multiple files
mkdir src docs
echo "console.log('Hello World');" > src/index.js
echo "# Documentation" > docs/guide.md
git add .
git commit -m "Add initial project structure"
git push

# Move files using Git
git mv old-name.txt new-name.txt
git commit -m "Rename file"

# Remove files
git rm file.txt
git rm -r directory/
git commit -m "Remove unnecessary files"

# Remove from Git but keep locally
git rm --cached sensitive-file.txt
echo "sensitive-file.txt" >> .gitignore
git add .gitignore
git commit -m "Stop tracking sensitive file"

# Large file handling with Git LFS
git lfs track "*.zip"
git lfs track "*.exe"
git lfs track "videos/*"
git add .gitattributes
git add large-file.zip
git commit -m "Add large files with LFS"

# View LFS files
git lfs ls-files
git lfs status
```

### 3.5 Repository Maintenance and Cleanup

```bash
# Clean up local repository
git gc
git gc --aggressive

# Prune remote tracking branches
git remote prune origin

# Remove large files from history (dangerous!)
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
git filter-repo --path large-file.zip --invert-paths

# Backup repository
git clone --mirror https://github.com/owner/repository.git repository-backup.git

# Create repository archive
gh repo archive owner/repository
wget https://github.com/owner/repository/archive/refs/heads/main.zip

# Sync fork with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# Or using GitHub CLI
gh repo sync owner/fork

# Repository statistics
git count-objects -v
git log --oneline | wc -l
git shortlog -sn
```

## 4. GitHub CLI: Command-Line Mastery

:::note GitHub CLI Requirements
Ensure GitHub CLI (gh) is installed and authenticated before running these commands. Authentication can be performed via `gh auth login`. Replace placeholder values with your specific repository names, issue numbers, and usernames.
:::

The GitHub CLI provides powerful command-line access to GitHub's features, enabling efficient automation and integration with development workflows.

### 4.1 Authentication and Configuration

```bash
# Authenticate with GitHub
gh auth login

# Login with specific scopes
gh auth login --scopes "repo,read:org,workflow"

# Login with token
gh auth login --with-token < token.txt

# Login to GitHub Enterprise
gh auth login --hostname github.enterprise.com

# Check authentication status
gh auth status

# Refresh authentication/add scopes
gh auth refresh -s read:project

# Switch between accounts
gh auth switch

# Logout
gh auth logout

# Configure default editor
gh config set editor vim
gh config set editor "code --wait"

# Configure default protocol
gh config set git_protocol ssh
gh config set git_protocol https

# Set default browser
gh config set browser firefox

# View all configuration
gh config list
```

### 4.2 Issue Management

```bash
# List issues
gh issue list
gh issue list --limit 50
gh issue list --state open
gh issue list --state closed
gh issue list --assignee @me
gh issue list --assignee username
gh issue list --label bug
gh issue list --milestone "v1.0"

# Create issue
gh issue create
gh issue create --title "Bug in login form" --body "Description here"
gh issue create --title "Feature request" --assignee username --label enhancement
gh issue create --web

# View issue
gh issue view 123
gh issue view 123 --web

# Edit issue
gh issue edit 123
gh issue edit 123 --title "Updated title"
gh issue edit 123 --add-assignee username
gh issue edit 123 --add-label bug,priority-high
gh issue edit 123 --remove-label enhancement

# Close/reopen issue
gh issue close 123
gh issue close 123 --comment "Fixed in #456"
gh issue reopen 123

# Transfer issue
gh issue transfer 123 owner/other-repo

# Pin/unpin issue
gh issue pin 123
gh issue unpin 123

# Comment on issue
gh issue comment 123 --body "Thanks for reporting this!"

# Search issues
gh search issues "is:open label:bug" --repo owner/repo
gh search issues "author:username created:>2024-01-01"
```

### 4.3 Pull Request Operations

```bash
# List pull requests
gh pr list
gh pr list --state open
gh pr list --author username
gh pr list --assignee @me
gh pr list --label "needs-review"
gh pr list --draft

# Create pull request
gh pr create
gh pr create --title "Add user authentication" --body "Implements JWT-based auth"
gh pr create --draft
gh pr create --base development --head feature/auth
gh pr create --assignee username --reviewer team:developers

# View pull request
gh pr view 456
gh pr view 456 --web

# Checkout pull request locally
gh pr checkout 456
gh pr checkout https://github.com/owner/repo/pull/456

# Edit pull request
gh pr edit 456
gh pr edit 456 --title "Updated title"
gh pr edit 456 --add-reviewer username
gh pr edit 456 --remove-assignee old-user

# Review pull request
gh pr review 456
gh pr review 456 --approve
gh pr review 456 --request-changes --body "Please fix the test failures"
gh pr review 456 --comment --body "Looks good overall"

# Merge pull request
gh pr merge 456
gh pr merge 456 --merge      # Create merge commit
gh pr merge 456 --squash     # Squash and merge
gh pr merge 456 --rebase     # Rebase and merge
gh pr merge 456 --delete-branch

# Close pull request
gh pr close 456

# Reopen pull request
gh pr reopen 456

# Mark as ready for review
gh pr ready 456

# Convert to draft
gh pr ready 456 --undo

# Check status
gh pr status
gh pr checks 456

# Sync with upstream
gh pr sync 456
```

### 4.4 GitHub Actions Integration

```bash
# List workflow runs
gh run list
gh run list --limit 50
gh run list --workflow build.yml
gh run list --status failure
gh run list --branch main

# View workflow run
gh run view 12345
gh run view 12345 --web

# View run logs
gh run view 12345 --log
gh run view 12345 --log-failed

# Download artifacts
gh run download 12345
gh run download 12345 --name build-artifacts

# Re-run workflow
gh run rerun 12345
gh run rerun 12345 --failed

# Cancel workflow run
gh run cancel 12345

# Watch workflow run
gh run watch 12345

# List workflows
gh workflow list

# View workflow
gh workflow view build.yml

# Run workflow manually
gh workflow run build.yml
gh workflow run build.yml --ref feature-branch
gh workflow run deploy.yml -f environment=production -f version=v1.2.3

# Enable/disable workflow
gh workflow enable build.yml
gh workflow disable build.yml

# Delete workflow runs
gh api -X DELETE /repos/owner/repo/actions/runs/12345
```

### 4.5 Release Management

```bash
# List releases
gh release list
gh release list --limit 20

# View release
gh release view v1.0.0
gh release view latest

# Create release
gh release create v1.2.0
gh release create v1.2.0 --title "Version 1.2.0" --notes "Bug fixes and improvements"
gh release create v1.2.0 --draft
gh release create v1.2.0 --prerelease
gh release create v1.2.0 --generate-notes

# Upload assets to release
gh release create v1.2.0 build/app.zip build/app.tar.gz
gh release upload v1.2.0 build/additional-file.zip

# Edit release
gh release edit v1.2.0
gh release edit v1.2.0 --title "Updated Title"
gh release edit v1.2.0 --notes "Updated release notes"

# Delete release
gh release delete v1.2.0
gh release delete v1.2.0 --yes

# Download release assets
gh release download v1.2.0
gh release download v1.2.0 --pattern "*.zip"
gh release download --repo owner/repo v1.2.0
```

### 4.6 Advanced CLI Operations

```bash
# Repository management
gh repo sync owner/fork
gh repo rename old-name new-name
gh repo transfer new-owner

# Organization management
gh org list
gh team list --org myorg
gh team create "Development Team" --org myorg
gh team add-member development username --org myorg

# Project management
gh project list --owner myorg
gh project create --title "Q1 Planning" --body "Planning for Q1"

# Search functionality
gh search repos "language:javascript stars:>1000"
gh search code "function authenticate" --repo owner/repo
gh search commits "author:username" --repo owner/repo
gh search users "location:Seattle"

# API access
gh api user
gh api repos/owner/repo/issues
gh api graphql -f query='query {viewer {login}}'

# Extensions
gh extension list
gh extension install owner/gh-extension
gh extension upgrade gh-extension
gh extension remove gh-extension

# Aliases
gh alias set pv 'pr view'
gh alias set co 'pr checkout'
gh alias list
gh alias delete pv

# Environment management
gh environment list
gh environment create production --protection-rules
gh environment delete staging

# Secrets management
gh secret set DATABASE_URL --env production
gh secret list --env production
gh secret delete OLD_SECRET --env production
```

## 5. GitHub Actions: Automation Mastery

:::note Actions Prerequisites
GitHub Actions examples require proper repository permissions and runner availability. Ensure workflows are placed in `.github/workflows/` directory. Replace placeholder values (repository names, secrets, environment variables) with your specific configuration.
:::

GitHub Actions provides comprehensive automation capabilities for continuous integration, deployment, and custom workflows.

### 5.1 Workflow Fundamentals

```yaml
# Basic workflow structure (.github/workflows/ci.yml)
name: Continuous Integration

# Trigger configuration
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'  # Weekly on Monday at 2 AM
  workflow_dispatch:     # Manual trigger

# Environment variables
env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io

# Job definitions
jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    
    # Service containers
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          fail_ci_if_error: true

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: test
    
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ github.repository }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 5.2 Advanced Workflow Patterns

```yaml
# Matrix strategy for multi-environment testing
name: Cross-Platform Testing

on: [push, pull_request]

jobs:
  test:
    name: Test on ${{ matrix.os }} with Node ${{ matrix.node-version }}
    runs-on: ${{ matrix.os }}
    
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        include:
          - os: ubuntu-latest
            node-version: 21
            experimental: true
        exclude:
          - os: windows-latest
            node-version: 16
    
    continue-on-error: ${{ matrix.experimental || false }}
    
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test

# Conditional workflow execution
name: Conditional Deployment

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'package*.json'
      - '.github/workflows/**'

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      backend: ${{ steps.changes.outputs.backend }}
      frontend: ${{ steps.changes.outputs.frontend }}
      docs: ${{ steps.changes.outputs.docs }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            backend:
              - 'api/**'
              - 'server/**'
            frontend:
              - 'src/**'
              - 'public/**'
            docs:
              - 'docs/**'
              - '*.md'

  deploy-backend:
    needs: detect-changes
    if: needs.detect-changes.outputs.backend == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Backend
        run: echo "Deploying backend changes"

  deploy-frontend:
    needs: detect-changes
    if: needs.detect-changes.outputs.frontend == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Frontend
        run: echo "Deploying frontend changes"

  update-docs:
    needs: detect-changes
    if: needs.detect-changes.outputs.docs == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Update Documentation
        run: echo "Updating documentation"
```

### 5.3 Reusable Workflows and Composite Actions

```yaml
# Reusable workflow (.github/workflows/reusable-build.yml)
name: Reusable Build Workflow

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      node-version:
        required: false
        type: string
        default: '18'
      deploy:
        required: false
        type: boolean
        default: false
    secrets:
      DEPLOY_TOKEN:
        required: false
    outputs:
      build-version:
        description: "The version that was built"
        value: ${{ jobs.build.outputs.version }}

jobs:
  build:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    outputs:
      version: ${{ steps.version.outputs.version }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Get version
        id: version
        run: echo "version=$(npm run version --silent)" >> $GITHUB_OUTPUT
      
      - name: Deploy
        if: inputs.deploy
        run: |
          echo "Deploying to ${{ inputs.environment }}"
          # Use deployment token if provided
          echo "Token available: ${{ secrets.DEPLOY_TOKEN != '' }}"

# Composite action (.github/actions/setup-project/action.yml)
name: 'Setup Project Environment'
description: 'Setup Node.js, install dependencies, and configure project'

inputs:
  node-version:
    description: 'Node.js version to use'
    required: false
    default: '18'
  cache-key-suffix:
    description: 'Additional cache key suffix'
    required: false
    default: ''

outputs:
  cache-hit:
    description: 'Whether dependencies were restored from cache'
    value: ${{ steps.cache.outputs.cache-hit }}

runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
    
    - name: Cache dependencies
      id: cache
      uses: actions/cache@v3
      with:
        path: |
          ~/.npm
          node_modules
        key: ${{ runner.os }}-node-${{ inputs.node-version }}-${{ hashFiles('**/package-lock.json') }}-${{ inputs.cache-key-suffix }}
        restore-keys: |
          ${{ runner.os }}-node-${{ inputs.node-version }}-
    
    - name: Install dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      shell: bash
      run: npm ci
    
    - name: Verify installation
      shell: bash
      run: npm list --depth=0

# Using reusable workflow
name: Main CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-staging:
    uses: ./.github/workflows/reusable-build.yml
    with:
      environment: staging
      node-version: '18'
      deploy: true
    secrets:
      DEPLOY_TOKEN: ${{ secrets.STAGING_DEPLOY_TOKEN }}
  
  build-production:
    if: github.ref == 'refs/heads/main'
    needs: build-staging
    uses: ./.github/workflows/reusable-build.yml
    with:
      environment: production
      node-version: '18'
      deploy: true
    secrets:
      DEPLOY_TOKEN: ${{ secrets.PRODUCTION_DEPLOY_TOKEN }}
```

### 5.4 Security and Secrets Management

```yaml
name: Secure Deployment Pipeline

on:
  push:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: moderate

  deploy:
    needs: security-scan
    runs-on: ubuntu-latest
    environment: production
    
    permissions:
      id-token: write
      contents: read
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1
      
      - name: Deploy with secrets
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          # Using GitHub App for authentication
          GH_TOKEN: ${{ steps.app-token.outputs.token }}
        run: |
          echo "Deploying with secure credentials"
          # Mask sensitive output
          echo "::add-mask::$DATABASE_URL"
          echo "Database configured"

  notify:
    needs: [security-scan, deploy]
    runs-on: ubuntu-latest
    if: always()
    
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### 5.5 Self-Hosted Runners and Enterprise Features

```yaml
name: Enterprise Deployment

on:
  push:
    branches: [main]

jobs:
  build-on-self-hosted:
    runs-on: [self-hosted, linux, x64, gpu]
    
    steps:
      - uses: actions/checkout@v4
        with:
          lfs: true
      
      - name: Setup custom environment
        run: |
          source /opt/company/setup.sh
          echo "CUSTOM_PATH=/opt/company/bin" >> $GITHUB_ENV
      
      - name: Build with GPU acceleration
        run: |
          export PATH=$CUSTOM_PATH:$PATH
          make build-gpu
      
      - name: Run performance tests
        run: |
          ./performance-tests --gpu --threads=16
      
      - name: Archive artifacts
        uses: actions/upload-artifact@v3
        with:
          name: gpu-build
          path: |
            dist/
            reports/
          retention-days: 30

  compliance-check:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: SAST Scanning
        uses: github/super-linter@v4
        env:
          DEFAULT_BRANCH: main
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VALIDATE_ALL_CODEBASE: false
      
      - name: License compliance
        uses: fossa-contrib/fossa-action@v2
        with:
          api-key: ${{ secrets.FOSSA_API_KEY }}
      
      - name: Generate SBOM
        uses: anchore/sbom-action@v0
        with:
          format: spdx-json
          output-file: sbom.spdx.json
      
      - name: Upload SBOM
        uses: actions/upload-artifact@v3
        with:
          name: sbom
          path: sbom.spdx.json

  deploy-to-kubernetes:
    needs: [build-on-self-hosted, compliance-check]
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'v1.28.0'
      
      - name: Configure kubeconfig
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
          export KUBECONFIG=kubeconfig
      
      - name: Deploy to Kubernetes
        run: |
          kubectl apply -f k8s/
          kubectl rollout status deployment/app -n production
          kubectl get services -n production
```

### 5.6 Workflow Debugging and Monitoring

```yaml
name: Debug and Monitor Workflows

on:
  workflow_dispatch:
    inputs:
      debug_enabled:
        description: 'Enable debug logging'
        required: false
        default: 'false'
        type: boolean
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  debug-info:
    runs-on: ubuntu-latest
    
    steps:
      - name: Dump GitHub context
        if: inputs.debug_enabled
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      
      - name: Dump job context
        if: inputs.debug_enabled
        env:
          JOB_CONTEXT: ${{ toJson(job) }}
        run: echo "$JOB_CONTEXT"
      
      - name: Dump runner context
        if: inputs.debug_enabled
        env:
          RUNNER_CONTEXT: ${{ toJson(runner) }}
        run: echo "$RUNNER_CONTEXT"
      
      - name: Enable debug logging
        if: inputs.debug_enabled
        run: |
          echo "ACTIONS_STEP_DEBUG=true" >> $GITHUB_ENV
          echo "ACTIONS_RUNNER_DEBUG=true" >> $GITHUB_ENV

  monitor-performance:
    runs-on: ubuntu-latest
    
    steps:
      - name: Start timing
        run: echo "START_TIME=$(date +%s)" >> $GITHUB_ENV
      
      - name: Simulate work
        run: |
          echo "Performing deployment to ${{ inputs.environment }}"
          sleep 10
      
      - name: Calculate duration
        run: |
          END_TIME=$(date +%s)
          DURATION=$((END_TIME - START_TIME))
          echo "Deployment took $DURATION seconds"
          echo "::notice title=Deployment Duration::Deployment to ${{ inputs.environment }} completed in $DURATION seconds"
      
      - name: Send metrics to monitoring
        run: |
          curl -X POST "${{ secrets.METRICS_ENDPOINT }}" \
            -H "Authorization: Bearer ${{ secrets.METRICS_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{
              "metric": "github_actions_duration",
              "value": '$DURATION',
              "tags": {
                "workflow": "${{ github.workflow }}",
                "environment": "${{ inputs.environment }}",
                "repository": "${{ github.repository }}"
              }
            }'

  workflow-summary:
    needs: [debug-info, monitor-performance]
    runs-on: ubuntu-latest
    if: always()
    
    steps:
      - name: Generate workflow summary
        run: |
          echo "# Workflow Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "## Parameters" >> $GITHUB_STEP_SUMMARY
          echo "- Environment: ${{ inputs.environment }}" >> $GITHUB_STEP_SUMMARY
          echo "- Debug Enabled: ${{ inputs.debug_enabled }}" >> $GITHUB_STEP_SUMMARY
          echo "- Triggered by: ${{ github.actor }}" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "## Job Results" >> $GITHUB_STEP_SUMMARY
          echo "- Debug Info: ${{ needs.debug-info.result }}" >> $GITHUB_STEP_SUMMARY
          echo "- Performance Monitor: ${{ needs.monitor-performance.result }}" >> $GITHUB_STEP_SUMMARY
```

## 6. GitHub API Integration

:::note API Prerequisites
GitHub API examples require proper authentication tokens with appropriate scopes. Replace placeholder values (usernames, repository names, tokens) with your actual values. Rate limiting applies to all API calls (5000 requests/hour for authenticated requests).
:::

GitHub's REST and GraphQL APIs provide programmatic access to all platform features, enabling custom integrations and automation.

### 6.1 REST API Fundamentals

```bash
# Authentication methods
export GITHUB_TOKEN="your_personal_access_token"

# Basic API requests with curl
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/user

# Get user information
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/users/username

# List repositories
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/user/repos?type=owner&sort=updated&per_page=50

# Get repository information
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/owner/repository

# List repository issues
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/owner/repository/issues?state=open&labels=bug

# Create an issue
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/issues \
     -d '{
       "title": "API Integration Bug",
       "body": "There is an issue with the API integration",
       "assignees": ["username"],
       "labels": ["bug", "priority-high"]
     }'

# Update an issue
curl -X PATCH \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/issues/1 \
     -d '{
       "state": "closed",
       "state_reason": "completed"
     }'

# List pull requests
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
     https://api.github.com/repos/owner/repository/pulls?state=open

# Create a pull request
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/pulls \
     -d '{
       "title": "Add API integration feature",
       "body": "This PR adds API integration functionality",
       "head": "feature/api-integration",
       "base": "main"
     }'
```

### 6.2 Advanced REST API Operations

```bash
# Repository management
# Create repository
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/user/repos \
     -d '{
       "name": "new-repository",
       "description": "A new repository created via API",
       "private": false,
       "has_issues": true,
       "has_projects": true,
       "has_wiki": false
     }'

# Update repository settings
curl -X PATCH \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository \
     -d '{
       "description": "Updated description",
       "has_issues": true,
       "has_projects": false,
       "default_branch": "main"
     }'

# Manage repository collaborators
curl -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/collaborators/username \
     -d '{"permission": "push"}'

# Branch protection
curl -X PUT \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/branches/main/protection \
     -d '{
       "required_status_checks": {
         "strict": true,
         "contexts": ["ci/build", "ci/test"]
       },
       "enforce_admins": true,
       "required_pull_request_reviews": {
         "required_approving_review_count": 2,
         "dismiss_stale_reviews": true
       },
       "restrictions": null
     }'

# Webhooks management
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/hooks \
     -d '{
       "name": "web",
       "active": true,
       "events": ["push", "pull_request"],
       "config": {
         "url": "https://example.com/webhook",
         "content_type": "json",
         "insecure_ssl": "0",
         "secret": "webhook-secret"
       }
     }'

# Release management
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/owner/repository/releases \
     -d '{
       "tag_name": "v1.0.0",
       "target_commitish": "main",
       "name": "v1.0.0",
       "body": "Release notes for version 1.0.0",
       "draft": false,
       "prerelease": false
     }'

# Upload release asset
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/zip" \
     --data-binary @release.zip \
     "https://uploads.github.com/repos/owner/repository/releases/12345/assets?name=release.zip"
```

### 6.3 GraphQL API Operations

```bash
# Basic GraphQL query
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.github.com/graphql \
     -d '{
       "query": "query { viewer { login email } }"
     }'

# Repository information with GraphQL
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.github.com/graphql \
     -d '{
       "query": "query($owner: String!, $name: String!) {
         repository(owner: $owner, name: $name) {
           name
           description
           stargazerCount
           forkCount
           issues(states: OPEN) {
             totalCount
           }
           pullRequests(states: OPEN) {
             totalCount
           }
           defaultBranchRef {
             name
           }
         }
       }",
       "variables": {
         "owner": "owner",
         "name": "repository"
       }
     }'

# Complex query with pagination
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.github.com/graphql \
     -d '{
       "query": "query($owner: String!, $name: String!, $cursor: String) {
         repository(owner: $owner, name: $name) {
           issues(first: 10, after: $cursor, states: OPEN) {
             pageInfo {
               hasNextPage
               endCursor
             }
             nodes {
               number
               title
               author {
                 login
               }
               createdAt
               labels(first: 5) {
                 nodes {
                   name
                 }
               }
             }
           }
         }
       }",
       "variables": {
         "owner": "owner",
         "name": "repository",
         "cursor": null
       }
     }'

# GitHub Projects v2 query
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.github.com/graphql \
     -d '{
       "query": "query($org: String!, $number: Int!) {
         organization(login: $org) {
           projectV2(number: $number) {
             id
             title
             fields(first: 20) {
               nodes {
                 ... on ProjectV2Field {
                   id
                   name
                 }
                 ... on ProjectV2SingleSelectField {
                   id
                   name
                   options {
                     id
                     name
                   }
                 }
               }
             }
             items(first: 50) {
               nodes {
                 id
                 content {
                   ... on Issue {
                     number
                     title
                     state
                   }
                   ... on PullRequest {
                     number
                     title
                     state
                   }
                 }
               }
             }
           }
         }
       }",
       "variables": {
         "org": "organization",
         "number": 1
       }
     }'

# Mutation example - Create issue
curl -X POST \
     -H "Authorization: Bearer $GITHUB_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.github.com/graphql \
     -d '{
       "query": "mutation($repositoryId: ID!, $title: String!, $body: String!) {
         createIssue(input: {
           repositoryId: $repositoryId,
           title: $title,
           body: $body
         }) {
           issue {
             number
             title
             url
           }
         }
       }",
       "variables": {
         "repositoryId": "MDEwOlJlcG9zaXRvcnk=",
         "title": "GraphQL API Issue",
         "body": "This issue was created using GraphQL API"
       }
     }'
```

### 6.4 Python API Integration Examples

```python
#!/usr/bin/env python3
"""
GitHub API Integration Examples using Python
"""
import requests
import json
import os
from typing import Dict, List, Optional

class GitHubAPI:
    def __init__(self, token: str, base_url: str = "https://api.github.com"):
        self.token = token
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28"
        })
    
    def get_user(self, username: Optional[str] = None) -> Dict:
        """Get user information"""
        endpoint = f"/users/{username}" if username else "/user"
        response = self.session.get(f"{self.base_url}{endpoint}")
        response.raise_for_status()
        return response.json()
    
    def list_repositories(self, username: Optional[str] = None, 
                         type: str = "owner", sort: str = "updated") -> List[Dict]:
        """List repositories for user"""
        if username:
            endpoint = f"/users/{username}/repos"
        else:
            endpoint = "/user/repos"
        
        params = {"type": type, "sort": sort, "per_page": 100}
        response = self.session.get(f"{self.base_url}{endpoint}", params=params)
        response.raise_for_status()
        return response.json()
    
    def create_repository(self, name: str, description: str = "", 
                         private: bool = False, **kwargs) -> Dict:
        """Create a new repository"""
        data = {
            "name": name,
            "description": description,
            "private": private,
            **kwargs
        }
        response = self.session.post(f"{self.base_url}/user/repos", json=data)
        response.raise_for_status()
        return response.json()
    
    def list_issues(self, owner: str, repo: str, state: str = "open", 
                   labels: Optional[List[str]] = None) -> List[Dict]:
        """List repository issues"""
        endpoint = f"/repos/{owner}/{repo}/issues"
        params = {"state": state, "per_page": 100}
        if labels:
            params["labels"] = ",".join(labels)
        
        response = self.session.get(f"{self.base_url}{endpoint}", params=params)
        response.raise_for_status()
        return response.json()
    
    def create_issue(self, owner: str, repo: str, title: str, body: str = "", 
                    assignees: Optional[List[str]] = None, 
                    labels: Optional[List[str]] = None) -> Dict:
        """Create a new issue"""
        data = {
            "title": title,
            "body": body
        }
        if assignees:
            data["assignees"] = assignees
        if labels:
            data["labels"] = labels
        
        endpoint = f"/repos/{owner}/{repo}/issues"
        response = self.session.post(f"{self.base_url}{endpoint}", json=data)
        response.raise_for_status()
        return response.json()
    
    def create_pull_request(self, owner: str, repo: str, title: str, head: str, 
                           base: str, body: str = "", draft: bool = False) -> Dict:
        """Create a pull request"""
        data = {
            "title": title,
            "head": head,
            "base": base,
            "body": body,
            "draft": draft
        }
        
        endpoint = f"/repos/{owner}/{repo}/pulls"
        response = self.session.post(f"{self.base_url}{endpoint}", json=data)
        response.raise_for_status()
        return response.json()
    
    def graphql_query(self, query: str, variables: Optional[Dict] = None) -> Dict:
        """Execute GraphQL query"""
        data = {"query": query}
        if variables:
            data["variables"] = variables
        
        response = self.session.post(f"{self.base_url}/graphql", json=data)
        response.raise_for_status()
        return response.json()

# Usage examples
def main():
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("GITHUB_TOKEN environment variable required")
    
    github = GitHubAPI(token)
    
    # Get current user
    user = github.get_user()
    print(f"Authenticated as: {user['login']}")
    
    # List repositories
    repos = github.list_repositories()
    print(f"Found {len(repos)} repositories")
    
    # Create issue
    try:
        issue = github.create_issue(
            owner="owner",
            repo="repository",
            title="API Integration Test",
            body="This issue was created via Python API",
            labels=["api", "test"]
        )
        print(f"Created issue #{issue['number']}: {issue['title']}")
    except requests.HTTPError as e:
        print(f"Failed to create issue: {e}")
    
    # GraphQL query example
    query = """
    query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            stargazerCount
            forkCount
            issues(states: OPEN) {
                totalCount
            }
        }
    }
    """
    variables = {"owner": "owner", "name": "repository"}
    
    try:
        result = github.graphql_query(query, variables)
        repo_data = result["data"]["repository"]
        print(f"Repository stats: {repo_data}")
    except requests.HTTPError as e:
        print(f"GraphQL query failed: {e}")

if __name__ == "__main__":
    main()
```

### 6.5 JavaScript/Node.js API Integration

```javascript
#!/usr/bin/env node
/**
 * GitHub API Integration Examples using Node.js and Octokit
 */
const { Octokit } = require("@octokit/rest");
const { createAppAuth } = require("@octokit/auth-app");

class GitHubAPIClient {
    constructor(token) {
        this.octokit = new Octokit({
            auth: token,
            userAgent: 'github-api-client-v1.0.0',
        });
    }

    // Static method for GitHub App authentication
    static async createAppClient(appId, privateKey, installationId) {
        const octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId,
                privateKey,
                installationId,
            },
        });
        return new GitHubAPIClient(null, octokit);
    }

    constructor(token, octokitInstance = null) {
        this.octokit = octokitInstance || new Octokit({
            auth: token,
            userAgent: 'github-api-client-v1.0.0',
        });
    }

    async getCurrentUser() {
        try {
            const { data } = await this.octokit.rest.users.getAuthenticated();
            return data;
        } catch (error) {
            console.error('Error getting current user:', error.message);
            throw error;
        }
    }

    async listRepositories(options = {}) {
        const {
            type = 'owner',
            sort = 'updated',
            direction = 'desc',
            per_page = 100
        } = options;

        try {
            const { data } = await this.octokit.rest.repos.listForAuthenticatedUser({
                type,
                sort,
                direction,
                per_page
            });
            return data;
        } catch (error) {
            console.error('Error listing repositories:', error.message);
            throw error;
        }
    }

    async createRepository(repoData) {
        const {
            name,
            description = '',
            private: isPrivate = false,
            has_issues = true,
            has_projects = true,
            has_wiki = false,
            auto_init = true,
            gitignore_template,
            license_template,
            allow_squash_merge = true,
            allow_merge_commit = true,
            allow_rebase_merge = true,
            delete_branch_on_merge = true
        } = repoData;

        try {
            const { data } = await this.octokit.rest.repos.createForAuthenticatedUser({
                name,
                description,
                private: isPrivate,
                has_issues,
                has_projects,
                has_wiki,
                auto_init,
                gitignore_template,
                license_template,
                allow_squash_merge,
                allow_merge_commit,
                allow_rebase_merge,
                delete_branch_on_merge
            });
            return data;
        } catch (error) {
            console.error('Error creating repository:', error.message);
            throw error;
        }
    }

    async createIssue(owner, repo, issueData) {
        const {
            title,
            body = '',
            assignees = [],
            labels = [],
            milestone
        } = issueData;

        try {
            const { data } = await this.octokit.rest.issues.create({
                owner,
                repo,
                title,
                body,
                assignees,
                labels,
                milestone
            });
            return data;
        } catch (error) {
            console.error('Error creating issue:', error.message);
            throw error;
        }
    }

    async createPullRequest(owner, repo, prData) {
        const {
            title,
            head,
            base,
            body = '',
            draft = false
        } = prData;

        try {
            const { data } = await this.octokit.rest.pulls.create({
                owner,
                repo,
                title,
                head,
                base,
                body,
                draft
            });
            return data;
        } catch (error) {
            console.error('Error creating pull request:', error.message);
            throw error;
        }
    }

    async setupBranchProtection(owner, repo, branch, protectionRules) {
        const {
            required_status_checks = null,
            enforce_admins = true,
            required_pull_request_reviews = null,
            restrictions = null,
            allow_force_pushes = false,
            allow_deletions = false
        } = protectionRules;

        try {
            const { data } = await this.octokit.rest.repos.updateBranchProtection({
                owner,
                repo,
                branch,
                required_status_checks,
                enforce_admins,
                required_pull_request_reviews,
                restrictions,
                allow_force_pushes,
                allow_deletions
            });
            return data;
        } catch (error) {
            console.error('Error setting up branch protection:', error.message);
            throw error;
        }
    }

    async createWebhook(owner, repo, webhookConfig) {
        const {
            url,
            events = ['push', 'pull_request'],
            secret,
            content_type = 'json',
            insecure_ssl = false
        } = webhookConfig;

        try {
            const { data } = await this.octokit.rest.repos.createWebhook({
                owner,
                repo,
                name: 'web',
                active: true,
                events,
                config: {
                    url,
                    content_type,
                    secret,
                    insecure_ssl: insecure_ssl ? '1' : '0'
                }
            });
            return data;
        } catch (error) {
            console.error('Error creating webhook:', error.message);
            throw error;
        }
    }

    async createRelease(owner, repo, releaseData) {
        const {
            tag_name,
            target_commitish = 'main',
            name,
            body = '',
            draft = false,
            prerelease = false,
            generate_release_notes = false
        } = releaseData;

        try {
            const { data } = await this.octokit.rest.repos.createRelease({
                owner,
                repo,
                tag_name,
                target_commitish,
                name: name || tag_name,
                body,
                draft,
                prerelease,
                generate_release_notes
            });
            return data;
        } catch (error) {
            console.error('Error creating release:', error.message);
            throw error;
        }
    }

    async uploadReleaseAsset(owner, repo, releaseId, assetPath, assetName) {
        const fs = require('fs');
        const path = require('path');

        try {
            const data = fs.readFileSync(assetPath);
            const contentType = this.getContentType(path.extname(assetName));

            const { data: asset } = await this.octokit.rest.repos.uploadReleaseAsset({
                owner,
                repo,
                release_id: releaseId,
                name: assetName,
                data,
                headers: {
                    'content-type': contentType,
                    'content-length': data.length
                }
            });
            return asset;
        } catch (error) {
            console.error('Error uploading release asset:', error.message);
            throw error;
        }
    }

    getContentType(extension) {
        const contentTypes = {
            '.zip': 'application/zip',
            '.tar.gz': 'application/gzip',
            '.exe': 'application/octet-stream',
            '.dmg': 'application/octet-stream',
            '.deb': 'application/vnd.debian.binary-package',
            '.rpm': 'application/x-rpm'
        };
        return contentTypes[extension] || 'application/octet-stream';
    }

    async executeGraphQLQuery(query, variables = {}) {
        try {
            const response = await this.octokit.graphql(query, variables);
            return response;
        } catch (error) {
            console.error('GraphQL query error:', error.message);
            throw error;
        }
    }

    async getProjectV2Data(org, projectNumber) {
        const query = `
            query($org: String!, $number: Int!) {
                organization(login: $org) {
                    projectV2(number: $number) {
                        id
                        title
                        fields(first: 20) {
                            nodes {
                                ... on ProjectV2Field {
                                    id
                                    name
                                }
                                ... on ProjectV2SingleSelectField {
                                    id
                                    name
                                    options {
                                        id
                                        name
                                    }
                                }
                            }
                        }
                        items(first: 50) {
                            nodes {
                                id
                                content {
                                    ... on Issue {
                                        number
                                        title
                                        state
                                    }
                                    ... on PullRequest {
                                        number
                                        title
                                        state
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        return await this.executeGraphQLQuery(query, { org, number: projectNumber });
    }

    async bulkOperations(operations) {
        const results = [];
        const errors = [];

        for (const operation of operations) {
            try {
                const result = await this.executeOperation(operation);
                results.push({ success: true, operation, result });
            } catch (error) {
                errors.push({ success: false, operation, error: error.message });
            }
        }

        return { results, errors };
    }

    async executeOperation(operation) {
        const { type, params } = operation;

        switch (type) {
            case 'createIssue':
                return await this.createIssue(params.owner, params.repo, params);
            case 'createPR':
                return await this.createPullRequest(params.owner, params.repo, params);
            case 'createRepo':
                return await this.createRepository(params);
            default:
                throw new Error(`Unknown operation type: ${type}`);
        }
    }
}

// Usage examples
async function main() {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error('GITHUB_TOKEN environment variable is required');
        process.exit(1);
    }

    const client = new GitHubAPIClient(token);

    try {
        // Get current user
        const user = await client.getCurrentUser();
        console.log(`Authenticated as: ${user.login}`);

        // List repositories
        const repos = await client.listRepositories({ per_page: 10 });
        console.log(`Found ${repos.length} repositories`);

        // Create a new repository (uncomment to use)
        /*
        const newRepo = await client.createRepository({
            name: 'api-test-repo',
            description: 'Test repository created via API',
            private: false,
            auto_init: true,
            gitignore_template: 'Node',
            license_template: 'mit'
        });
        console.log(`Created repository: ${newRepo.html_url}`);
        */

        // Create an issue (uncomment to use)
        /*
        const issue = await client.createIssue('owner', 'repo', {
            title: 'API Integration Test',
            body: 'This issue was created using the GitHub API via Node.js',
            labels: ['api', 'test'],
            assignees: ['username']
        });
        console.log(`Created issue #${issue.number}: ${issue.title}`);
        */

        // GraphQL query example
        const projectData = await client.getProjectV2Data('organization', 1);
        console.log('Project data:', projectData);

        // Bulk operations example
        const operations = [
            {
                type: 'createIssue',
                params: {
                    owner: 'owner',
                    repo: 'repo',
                    title: 'Bulk Issue 1',
                    body: 'Created via bulk operation'
                }
            },
            {
                type: 'createIssue',
                params: {
                    owner: 'owner',
                    repo: 'repo',
                    title: 'Bulk Issue 2',
                    body: 'Created via bulk operation'
                }
            }
        ];

        const bulkResults = await client.bulkOperations(operations);
        console.log('Bulk operation results:', bulkResults);

    } catch (error) {
        console.error('Main execution error:', error.message);
        process.exit(1);
    }
}

// GitHub App authentication example
async function githubAppExample() {
    const appId = process.env.GITHUB_APP_ID;
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
    const installationId = process.env.GITHUB_APP_INSTALLATION_ID;

    if (!appId || !privateKey || !installationId) {
        console.error('GitHub App credentials required');
        return;
    }

    try {
        const appClient = await GitHubAPIClient.createAppClient(
            appId,
            privateKey,
            installationId
        );

        const installations = await appClient.octokit.rest.apps.listInstallations();
        console.log('App installations:', installations.data.length);

    } catch (error) {
        console.error('GitHub App error:', error.message);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { GitHubAPIClient };
```

### 6.6 Webhook Integration and Event Processing

```javascript
// Express.js webhook server
const express = require('express');
const crypto = require('crypto');
const app = express();

// Middleware for webhook signature verification
function verifyGitHubWebhook(secret) {
    return (req, res, next) => {
        const signature = req.get('X-Hub-Signature-256');
        const payload = JSON.stringify(req.body);
        
        if (!signature) {
            return res.status(401).send('No signature provided');
        }

        const expectedSignature = 'sha256=' + crypto
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');

        if (!crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        )) {
            return res.status(401).send('Invalid signature');
        }

        next();
    };
}

app.use(express.json());
app.use('/webhook', verifyGitHubWebhook(process.env.WEBHOOK_SECRET));

// Webhook event handlers
const eventHandlers = {
    push: (payload) => {
        console.log(`Push to ${payload.repository.full_name}`);
        console.log(`Branch: ${payload.ref}`);
        console.log(`Commits: ${payload.commits.length}`);
        
        // Trigger CI/CD pipeline
        triggerBuild(payload);
    },

    pull_request: (payload) => {
        const { action, pull_request, repository } = payload;
        console.log(`PR ${action}: #${pull_request.number} in ${repository.full_name}`);
        
        switch (action) {
            case 'opened':
                handlePROpened(payload);
                break;
            case 'closed':
                if (pull_request.merged) {
                    handlePRMerged(payload);
                }
                break;
            case 'synchronize':
                handlePRUpdated(payload);
                break;
        }
    },

    issues: (payload) => {
        const { action, issue, repository } = payload;
        console.log(`Issue ${action}: #${issue.number} in ${repository.full_name}`);
        
        if (action === 'opened') {
            handleNewIssue(payload);
        }
    },

    release: (payload) => {
        const { action, release, repository } = payload;
        
        if (action === 'published') {
            console.log(`Release published: ${release.tag_name} in ${repository.full_name}`);
            handleReleasePublished(payload);
        }
    }
};

// Webhook endpoint
app.post('/webhook', (req, res) => {
    const event = req.get('X-GitHub-Event');
    const payload = req.body;

    console.log(`Received ${event} event`);

    if (eventHandlers[event]) {
        try {
            eventHandlers[event](payload);
            res.status(200).send('OK');
        } catch (error) {
            console.error(`Error handling ${event} event:`, error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        console.log(`Unhandled event: ${event}`);
        res.status(200).send('Event not handled');
    }
});

// Event handler implementations
async function triggerBuild(payload) {
    // Example: Trigger Jenkins build
    const { repository, ref, after: commitSha } = payload;
    
    // Only build main branch
    if (ref !== 'refs/heads/main') return;

    try {
        const buildParams = {
            repository: repository.full_name,
            branch: 'main',
            commit: commitSha
        };

        // Trigger build system
        console.log('Triggering build with params:', buildParams);
        // await triggerJenkinsBuild(buildParams);
        
    } catch (error) {
        console.error('Failed to trigger build:', error);
    }
}

async function handlePROpened(payload) {
    const { pull_request, repository } = payload;
    
    // Auto-assign reviewers based on files changed
    const changedFiles = await getChangedFiles(repository.full_name, pull_request.number);
    const reviewers = determineReviewers(changedFiles);
    
    if (reviewers.length > 0) {
        await assignReviewers(repository.full_name, pull_request.number, reviewers);
    }

    // Add labels based on PR title or files
    const labels = determinePRLabels(pull_request, changedFiles);
    if (labels.length > 0) {
        await addLabels(repository.full_name, pull_request.number, labels);
    }
}

async function handlePRMerged(payload) {
    const { pull_request, repository } = payload;
    
    // Auto-deploy if merged to main
    if (pull_request.base.ref === 'main') {
        console.log('Main branch updated, triggering deployment');
        // await triggerDeployment(repository.full_name, pull_request.merge_commit_sha);
    }

    // Close related issues
    const issueNumbers = extractIssueNumbers(pull_request.body);
    for (const issueNumber of issueNumbers) {
        await closeIssue(repository.full_name, issueNumber, pull_request.number);
    }
}

async function handleNewIssue(payload) {
    const { issue, repository } = payload;
    
    // Auto-label based on issue content
    const labels = determineIssueLabels(issue);
    if (labels.length > 0) {
        await addLabels(repository.full_name, issue.number, labels);
    }

    // Auto-assign to project board
    await addToProject(repository.full_name, issue.number, 'triage');
}

function determineReviewers(changedFiles) {
    const reviewers = [];
    
    // CODEOWNERS-like logic
    const rules = [
        { pattern: /^src\/api\//, reviewers: ['backend-team'] },
        { pattern: /^src\/components\//, reviewers: ['frontend-team'] },
        { pattern: /^docs\//, reviewers: ['docs-team'] },
        { pattern: /\.test\.js$/, reviewers: ['qa-team'] }
    ];

    for (const file of changedFiles) {
        for (const rule of rules) {
            if (rule.pattern.test(file)) {
                reviewers.push(...rule.reviewers);
            }
        }
    }

    return [...new Set(reviewers)]; // Remove duplicates
}

function determinePRLabels(pullRequest, changedFiles) {
    const labels = [];
    
    // Label based on title
    const title = pullRequest.title.toLowerCase();
    if (title.includes('fix') || title.includes('bug')) {
        labels.push('bug');
    }
    if (title.includes('feat') || title.includes('feature')) {
        labels.push('enhancement');
    }
    if (title.includes('break') || title.includes('breaking')) {
        labels.push('breaking-change');
    }

    // Label based on files changed
    if (changedFiles.some(file => file.includes('test'))) {
        labels.push('tests');
    }
    if (changedFiles.some(file => file.includes('doc'))) {
        labels.push('documentation');
    }

    return labels;
}

function extractIssueNumbers(text) {
    const matches = text.match(/(close|closes|fix|fixes|resolve|resolves)\s+#(\d+)/gi);
    return matches ? matches.map(match => parseInt(match.match(/\d+/)[0])) : [];
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
});
```

### 6.7 Rate Limiting and Error Handling

```javascript
// Advanced rate limiting and retry logic
class GitHubAPIWithRetry extends GitHubAPIClient {
    constructor(token, options = {}) {
        super(token);
        this.maxRetries = options.maxRetries || 3;
        this.baseDelay = options.baseDelay || 1000;
        this.maxDelay = options.maxDelay || 30000;
    }

    async withRetry(operation, ...args) {
        let attempt = 0;
        
        while (attempt <= this.maxRetries) {
            try {
                return await operation.apply(this, args);
            } catch (error) {
                if (this.shouldRetry(error, attempt)) {
                    const delay = this.calculateDelay(attempt, error);
                    console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms: ${error.message}`);
                    await this.sleep(delay);
                    attempt++;
                } else {
                    throw error;
                }
            }
        }
        
        throw new Error(`Operation failed after ${this.maxRetries} retries`);
    }

    shouldRetry(error, attempt) {
        if (attempt >= this.maxRetries) return false;
        
        // Retry on rate limiting
        if (error.status === 403 && error.message.includes('rate limit')) {
            return true;
        }
        
        // Retry on server errors
        if (error.status >= 500) {
            return true;
        }
        
        // Retry on network errors
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNRESET') {
            return true;
        }
        
        return false;
    }

    calculateDelay(attempt, error) {
        // Use X-RateLimit-Reset header for rate limiting
        if (error.status === 403 && error.response?.headers?.['x-ratelimit-reset']) {
            const resetTime = parseInt(error.response.headers['x-ratelimit-reset']) * 1000;
            const now = Date.now();
            const delay = Math.max(resetTime - now, 0);
            return Math.min(delay, this.maxDelay);
        }
        
        // Exponential backoff with jitter
        const exponentialDelay = this.baseDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 0.1 * exponentialDelay;
        return Math.min(exponentialDelay + jitter, this.maxDelay);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Override methods to add retry logic
    async createIssue(owner, repo, issueData) {
        return this.withRetry(super.createIssue, owner, repo, issueData);
    }

    async createPullRequest(owner, repo, prData) {
        return this.withRetry(super.createPullRequest, owner, repo, prData);
    }

    async listRepositories(options = {}) {
        return this.withRetry(super.listRepositories, options);
    }

    // Rate limiting monitoring
    async checkRateLimit() {
        try {
            const { data } = await this.octokit.rest.rateLimit.get();
            return {
                core: {
                    limit: data.rate.limit,
                    remaining: data.rate.remaining,
                    reset: new Date(data.rate.reset * 1000),
                    used: data.rate.used
                },
                search: {
                    limit: data.search.limit,
                    remaining: data.search.remaining,
                    reset: new Date(data.search.reset * 1000),
                    used: data.search.used
                }
            };
        } catch (error) {
            console.error('Error checking rate limit:', error.message);
            throw error;
        }
    }

    async waitForRateLimit() {
        const rateLimit = await this.checkRateLimit();
        
        if (rateLimit.core.remaining < 100) {
            const waitTime = rateLimit.core.reset.getTime() - Date.now();
            if (waitTime > 0) {
                console.log(`Rate limit low (${rateLimit.core.remaining} remaining), waiting ${waitTime}ms`);
                await this.sleep(waitTime + 1000); // Add 1 second buffer
            }
        }
    }
}

// Usage with rate limiting
async function batchOperations() {
    const client = new GitHubAPIWithRetry(process.env.GITHUB_TOKEN);
    
    // Check rate limits before starting
    const rateLimit = await client.checkRateLimit();
    console.log('Current rate limit:', rateLimit);
    
    const operations = [];
    for (let i = 0; i < 100; i++) {
        operations.push(async () => {
            await client.waitForRateLimit();
            return client.createIssue('owner', 'repo', {
                title: `Batch Issue ${i}`,
                body: `Created via batch operation ${i}`
            });
        });
    }
    
    // Process in batches to respect rate limits
    const batchSize = 10;
    const results = [];
    
    for (let i = 0; i < operations.length; i += batchSize) {
        const batch = operations.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
            batch.map(op => op())
        );
        results.push(...batchResults);
        
        // Wait between batches
        if (i + batchSize < operations.length) {
            await client.sleep(1000);
        }
    }
    
    return results;
}
```

## 7. Collaboration Workflows and Project Management

:::note Collaboration Prerequisites
The following examples assume you have appropriate repository permissions and organization access. Replace placeholder values with your actual organization, repository, and user names. Some features require specific GitHub plan subscriptions (Team, Enterprise).
:::

GitHub provides comprehensive collaboration tools including pull requests, code review, project management, and team coordination features.

### 7.1 Advanced Pull Request Workflows

```bash
# Feature branch workflow with GitHub CLI
# Create feature branch
git checkout -b feature/user-authentication
git push -u origin feature/user-authentication

# Make changes and commit
echo "# User Authentication Module" > auth.js
git add auth.js
git commit -m "Add authentication module structure"
git push

# Create draft pull request
gh pr create --draft --title "WIP: User Authentication" \
  --body "## Overview
This PR implements user authentication using JWT tokens.

## Changes
- [ ] Add authentication middleware
- [ ] Implement JWT token validation
- [ ] Add user login/logout endpoints
- [ ] Add password hashing

## Testing
- [ ] Unit tests for auth module
- [ ] Integration tests for login flow
- [ ] Security testing

## Breaking Changes
None

## Dependencies
- bcrypt for password hashing
- jsonwebtoken for JWT handling"

# Continue development and push updates
echo "function authenticate() { /* TODO */ }" >> auth.js
git add auth.js
git commit -m "Add authentication function skeleton"
git push

# Mark ready for review
gh pr ready

# Request specific reviewers
gh pr edit --add-reviewer alice,bob
gh pr edit --add-reviewer team:backend-team

# Auto-merge when ready
gh pr merge --auto --squash

# Advanced PR operations
# Checkout PR from fork
gh pr checkout https://github.com/contributor/repo/pull/123

# Compare PR with main
git diff main...feature/user-authentication

# Interactive rebase before merge
git rebase -i main
git push --force-with-lease

# Convert to draft if issues found
gh pr ready --undo
```

### 7.2 Code Review Best Practices

```bash
# Reviewing pull requests
# List PRs needing review
gh pr list --assignee @me
gh pr list --review-requested @me

# Review PR with comments
gh pr review 456 --comment --body "Overall looks good, few suggestions below"

# Request changes
gh pr review 456 --request-changes --body "Please address the following issues:

1. Add error handling in auth.js line 45
2. Missing unit tests for the new authentication function
3. Update documentation for the new API endpoints

Please re-request review once these are addressed."

# Approve PR
gh pr review 456 --approve --body "LGTM! Great work on the authentication implementation. 

✅ Code follows our style guidelines
✅ Tests are comprehensive
✅ Documentation is complete
✅ Security considerations addressed"

# Suggest specific changes (using GitHub CLI with file editing)
# Create suggestion comment
cat << 'EOF' > review-comment.md
```suggestion
function authenticate(token) {
  if (!token) {
    throw new Error('Token is required');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}```
EOF

# Bulk review workflow
gh pr list --json number,title,author | jq -r '.[] | "\(.number): \(.title) by \(.author.login)"'

# Review multiple files
gh pr diff 456
gh pr view 456 --web  # Open in browser for detailed review
```

### 7.3 Branch Protection and Security

```bash
# Set up comprehensive branch protection
gh api -X PUT "/repos/owner/repo/branches/main/protection" \
  --field required_status_checks='{"strict":true,"contexts":["ci/build","ci/test","security/scan"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"require_last_push_approval":true}' \
  --field restrictions='{"users":[],"teams":["admin-team"],"apps":[]}'

# Create CODEOWNERS file
cat << 'EOF' > .github/CODEOWNERS
# Global owners
* @admin-team

# Frontend code
/src/components/ @frontend-team
/src/styles/ @frontend-team @design-team

# Backend code
/src/api/ @backend-team
/src/database/ @backend-team @dba-team

# Infrastructure
/docker/ @devops-team
/.github/workflows/ @devops-team
/k8s/ @devops-team

# Documentation
/docs/ @docs-team
*.md @docs-team

# Security sensitive files
/src/auth/ @security-team @backend-team
/config/security/ @security-team
EOF

git add .github/CODEOWNERS
git commit -m "Add CODEOWNERS for automated review assignment"
git push

# Create security policy
mkdir -p .github
cat << 'EOF' > .github/SECURITY.md
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

Please report security vulnerabilities to security@company.com.

Do not report security vulnerabilities through public GitHub issues.
EOF

# Advanced security configurations
# Enable secret scanning
gh api -X PATCH "/repos/owner/repo" \
  --field security_and_analysis='{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}'

# Configure dependency security updates
gh api -X PUT "/repos/owner/repo/vulnerability-alerts"
gh api -X PUT "/repos/owner/repo/automated-security-fixes"
```

### 7.4 GitHub Projects and Issue Management

```bash
# Create and manage projects
gh project create --title "Q1 2024 Roadmap" --body "Planning and tracking for Q1 objectives"

# List projects
gh project list --owner myorg

# Project item management
gh project item-create 1 --body "Implement user authentication system"
gh project item-add 1 https://github.com/owner/repo/issues/123

# Advanced issue management
# Create issue template
mkdir -p .github/ISSUE_TEMPLATE
cat << 'EOF' > .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: File a bug report to help us improve
title: "[Bug]: "
labels: ["bug", "triage"]
assignees:
  - maintainer-team
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  
  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false
  
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  
  - type: dropdown
    id: version
    attributes:
      label: Version
      description: What version of our software are you running?
      options:
        - 1.0.2 (Default)
        - 1.0.3 (Edge)
    validations:
      required: true
  
  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
  
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our [Code of Conduct](https://example.com)
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
EOF

# Feature request template
cat << 'EOF' > .github/ISSUE_TEMPLATE/feature_request.yml
name: Feature Request
description: Suggest an idea for this project
title: "[Feature]: "
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        We love feature requests! Please help us understand what you're looking for.

  - type: textarea
    id: problem
    attributes:
      label: Is your feature request related to a problem?
      description: A clear and concise description of what the problem is.
      placeholder: I'm always frustrated when...

  - type: textarea
    id: solution
    attributes:
      label: Describe the solution you'd like
      description: A clear and concise description of what you want to happen.

  - type: textarea
    id: alternatives
    attributes:
      label: Describe alternatives you've considered
      description: A clear and concise description of any alternative solutions or features you've considered.

  - type: textarea
    id: context
    attributes:
      label: Additional context
      description: Add any other context or screenshots about the feature request here.
EOF

# Pull request template
cat << 'EOF' > .github/pull_request_template.md
## Description
Brief description of the changes in this PR.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Tests pass locally with my changes
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Related Issues
Closes #(issue_number)
EOF

# Advanced issue automation
gh issue create --title "Weekly Team Sync" \
  --body "## Agenda
- Review completed work
- Discuss blockers
- Plan next week's priorities

## Attendees
- [ ] @alice
- [ ] @bob
- [ ] @charlie

## Action Items
- [ ] Item 1
- [ ] Item 2" \
  --assignee @me \
  --label meeting,weekly

# Bulk issue operations
# Close multiple issues
gh issue list --state open --label "duplicate" --json number --jq '.[].number' | \
  xargs -I {} gh issue close {} --comment "Closing as duplicate"

# Apply labels to multiple issues
gh issue list --state open --search "react" --json number --jq '.[].number' | \
  xargs -I {} gh issue edit {} --add-label "frontend"
```

### 7.5 Team Management and Organization

```bash
# Organization management
# Create team
gh api -X POST "/orgs/myorg/teams" \
  --field name="backend-team" \
  --field description="Backend development team" \
  --field privacy="closed"

# Add members to team
gh api -X PUT "/orgs/myorg/teams/backend-team/memberships/username" \
  --field role="member"

# Add team to repository
gh api -X PUT "/orgs/myorg/teams/backend-team/repos/myorg/myrepo" \
  --field permission="push"

# List team members
gh api "/orgs/myorg/teams/backend-team/members"

# Organization security settings
# Enable two-factor authentication requirement
gh api -X PATCH "/orgs/myorg" \
  --field two_factor_requirement_enabled=true

# Configure member privileges
gh api -X PATCH "/orgs/myorg" \
  --field members_can_create_repositories=false \
  --field members_can_create_pages=false

# Repository access management
# Grant specific permissions
gh api -X PUT "/repos/owner/repo/collaborators/username" \
  --field permission="maintain"

# Remove collaborator
gh api -X DELETE "/repos/owner/repo/collaborators/username"

# Team-based repository access
gh api -X PUT "/orgs/myorg/teams/backend-team/repos/myorg/backend-api" \
  --field permission="admin"

# Outside collaborator management
gh api -X PUT "/repos/owner/repo/collaborators/contractor" \
  --field permission="triage"

# Audit and compliance
# List organization members
gh api "/orgs/myorg/members" --jq '.[].login'

# Audit repository access
gh api "/repos/owner/repo/collaborators" --jq '.[] | {login: .login, permission: .permissions}'

# Export audit logs (requires admin permissions)
gh api -X GET "/orgs/myorg/audit-log" \
  --field phrase="action:repo.create" \
  --field include="git" \
  > audit-log.json
```

### 7.6 Advanced Workflow Automation

```bash
# GitHub Apps for enhanced automation
# Create GitHub App configuration
cat << 'EOF' > github-app-config.yml
name: "Team Automation Bot"
description: "Automates team workflows and notifications"
homepage_url: "https://company.com/automation"
webhook_url: "https://bot.company.com/webhook"
permissions:
  issues: write
  pull_requests: write
  contents: read
  metadata: read
  checks: read
events:
  - issues
  - pull_request
  - push
  - check_run
EOF

# Automated project management with Actions
cat << 'EOF' > .github/workflows/project-automation.yml
name: Project Automation

on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened, ready_for_review, closed]

jobs:
  manage-projects:
    runs-on: ubuntu-latest
    steps:
      - name: Add issue to project
        if: github.event_name == 'issues' && github.event.action == 'opened'
        uses: actions/add-to-project@v0.4.0
        with:
          project-url: https://github.com/orgs/myorg/projects/1
          github-token: ${{ secrets.ADD_TO_PROJECT_PAT }}

      - name: Move to "In Progress" when PR opened
        if: github.event_name == 'pull_request' && github.event.action == 'opened'
        uses: actions/add-to-project@v0.4.0
        with:
          project-url: https://github.com/orgs/myorg/projects/1
          github-token: ${{ secrets.ADD_TO_PROJECT_PAT }}
          labeled: in-progress

      - name: Move to "Done" when PR merged
        if: github.event_name == 'pull_request' && github.event.action == 'closed' && github.event.pull_request.merged
        run: |
          # Extract issue numbers from PR body
          ISSUE_NUMBERS=$(echo "${{ github.event.pull_request.body }}" | grep -oP '(?:close|closes|fix|fixes|resolve|resolves)\s+#\K\d+')
          
          for ISSUE_NUM in $ISSUE_NUMBERS; do
            gh project item-edit --project-id ${{ vars.PROJECT_ID }} \
              --field-id ${{ vars.STATUS_FIELD_ID }} \
              --single-select-option-id ${{ vars.DONE_OPTION_ID }} \
              --id $(gh project item-list ${{ vars.PROJECT_ID }} --format json | jq -r ".[] | select(.content.number == $ISSUE_NUM) | .id")
          done
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  notify-team:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request' && github.event.action == 'ready_for_review'
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          channel: '#code-reviews'
          custom_payload: |
            {
              text: "New PR ready for review!",
              attachments: [{
                color: 'good',
                fields: [{
                  title: 'Pull Request',
                  value: '<${{ github.event.pull_request.html_url }}|${{ github.event.pull_request.title }}>',
                  short: true
                }, {
                  title: 'Author',
                  value: '${{ github.event.pull_request.user.login }}',
                  short: true
                }, {
                  title: 'Repository',
                  value: '${{ github.repository }}',
                  short: true
                }]
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

  auto-assign:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request' && github.event.action == 'opened'
    steps:
      - name: Auto-assign reviewers
        uses: actions/github-script@v7
        with:
          script: |
            const { data: files } = await github.rest.pulls.listFiles({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            });

            // Define reviewer assignment rules
            const rules = [
              { pattern: /^src\/api\//, reviewers: ['backend-team'] },
              { pattern: /^src\/components\//, reviewers: ['frontend-team'] },
              { pattern: /^docs\//, reviewers: ['docs-team'] },
              { pattern: /\.test\.[jt]sx?$/, reviewers: ['qa-team'] }
            ];

            const reviewers = new Set();
            
            files.forEach(file => {
              rules.forEach(rule => {
                if (rule.pattern.test(file.filename)) {
                  rule.reviewers.forEach(reviewer => reviewers.add(reviewer));
                }
              });
            });

            if (reviewers.size > 0) {
              await github.rest.pulls.requestReviewers({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: context.issue.number,
                team_reviewers: Array.from(reviewers)
              });
            }
EOF

# Automated release management
cat << 'EOF' > .github/workflows/release-automation.yml
name: Release Automation

on:
  push:
    tags:
      - 'v*'

jobs:
  create-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        id: changelog
        run: |
          # Get previous tag
          PREVIOUS_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          
          if [ -z "$PREVIOUS_TAG" ]; then
            CHANGELOG=$(git log --oneline --pretty=format:"- %s" ${{ github.ref_name }})
          else
            CHANGELOG=$(git log --oneline --pretty=format:"- %s" ${PREVIOUS_TAG}..${{ github.ref_name }})
          fi
          
          echo "changelog<<EOF" >> $GITHUB_OUTPUT
          echo "$CHANGELOG" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref_name }}
          release_name: Release ${{ github.ref_name }}
          body: |
            ## Changes in ${{ github.ref_name }}
            
            ${{ steps.changelog.outputs.changelog }}
            
            **Full Changelog**: https://github.com/${{ github.repository }}/compare/${{ steps.changelog.outputs.previous_tag }}...${{ github.ref_name }}
          draft: false
          prerelease: ${{ contains(github.ref_name, '-') }}

      - name: Close milestone
        run: |
          # Find milestone matching the tag
          MILESTONE_NUMBER=$(gh api "/repos/${{ github.repository }}/milestones" --jq ".[] | select(.title == \"${{ github.ref_name }}\") | .number")
          
          if [ -n "$MILESTONE_NUMBER" ]; then
            gh api -X PATCH "/repos/${{ github.repository }}/milestones/$MILESTONE_NUMBER" \
              --field state="closed"
            echo "Closed milestone: ${{ github.ref_name }}"
          fi
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
EOF
```

