---
title: "20 Powerful Git Commands"
description: "20 underused Git commands that will transform your development workflow. From debugging with bisect to managing large files with LFS, level up your version control game."
slug: git-hidden-gems-commands
sidebar_label: "Powerful Commands"
sidebar_position: 3
authors: [gl0bal01]
tags: [development, productivity]
keywords: [git commands, git tips, version control, git bisect, git grep, git hooks, git workflow]
date: 2024-06-18
---
import Highlight from '@site/src/components/Highlight';

# 20 Powerful Git Commands

Git is more than just `add`, `commit`, and `push`. Hidden within its extensive manual are dozens of powerful commands that can transform your development workflow. Let's explore 20 underused Git features that will level up your version control game.

## Table of Contents

### <Highlight>Visualization & Browsing</Highlight>
- [Git Web](#1-git-web---instant-repository-browser) - Browse your repo in a web GUI
- [Git GUI](#2-git-gui---visual-git-interface) - Native GUI application

### <Highlight>Enhanced Functionality</Highlight>
- [Git Notes](#3-git-notes---annotate-commits) - Add metadata to commits
- [Git Blame](#4-git-blame---track-code-authorship) - Find who wrote specific code
- [Git Describe](#5-git-describe---human-readable-commit-names) - Generate readable version strings

### <Highlight>Debugging & Search</Highlight>
- [Git Bisect](#6-git-bisect---binary-search-for-bugs) - Find bug-introducing commits
- [Git Grep](#7-git-grep---powerful-code-search) - Search across your entire project
- [Git Fsck](#8-git-fsck---verify-repository-integrity) - Check and recover objects

### <Highlight>Repository Management</Highlight>
- [Git Archive](#9-git-archive---export-repository) - Create compressed backups
- [Git GC](#10-git-gc---optimize-repository) - Clean up and optimize
- [Git LFS](#11-git-lfs---handle-large-files) - Manage large files efficiently

### <Highlight>Advanced Operations</Highlight>
- [Git Cherry Pick](#12-git-cherry-pick---selective-commit-import) - Import specific commits
- [Git Submodules](#13-git-submodules---nested-repositories) - Include other repos
- [Git Reflog](#14-git-reflog---recovery-time-machine) - View all repository actions

### <Highlight>Utilities</Highlight>
- [Git Stripspace](#15-git-stripspace---clean-whitespace) - Format whitespace
- [Git Show](#16-git-show---inspect-any-object) - Display git objects
- [Git Diff](#17-git-diff---advanced-comparisons) - Compare changes

### <Highlight>Workflow Enhancement</Highlight>
- [Git Hooks](#18-git-hooks---automate-workflows) - Trigger actions on events
- [Git Tag](#19-git-tag---version-marking) - Mark release points
- [Git Log](#20-git-log---advanced-history-viewing) - Enhanced commit history

---

## Visualization & Browsing

### 1. Git Web - Instant Repository Browser

Transform your terminal into a full-featured repository browser with a single command:

```bash
git instaweb
```

**What it does:** Launches a local web server (default: http://localhost:1234) with a visual interface for:
- Browsing commits, branches, and tags
- Viewing diffs and file history
- Generating RSS/Atom feeds
- Searching through commits

**Pro tip:** Specify a different web server with `-d` flag if Lighttpd isn't installed:
```bash
git instaweb -d webrick -p 8080
```

### 2. Git GUI - Visual Git Interface

For those who prefer clicking over typing:

```bash
git gui
```

Opens a native GUI application for staging, committing, and basic Git operations.

---

## Enhanced Functionality

### 3. Git Notes - Annotate Commits

Add extra information to commits without changing their SHA:

```bash
# Add a note to the latest commit
git notes add -m "Reviewed by John, approved for production"

# Add a note to a specific commit
git notes add -m "This fixes issue #123" abc1234

# View notes
git log --show-notes
```

<u>**Use cases:**</u>
- Code review comments
- Deployment tracking
- Additional context that wasn't in the original commit

### 4. Git Blame - Track Code Authorship

Find out who wrote each line of code (and who to blame for that bug 😄):

```bash
# Blame specific lines
git blame -L 10,20 app.js

# Blame with commit summary
git blame -L 10,+5 --show-email app.js

# Ignore whitespace changes
git blame -w app.js
```

### 5. Git Describe - Human-Readable Commit Names

Generate version strings based on tags:

```bash
# Get a version string for current commit
git describe
# Output: v1.2.3-14-g2414721

# Include all refs, not just tags
git describe --all
```

Perfect for automated version numbering in CI/CD pipelines.

---

## Debugging & Search

### 6. Git Bisect - Binary Search for Bugs

Find the exact commit that introduced a bug using binary search:

```bash
# Start bisecting
git bisect start

# Mark current commit as bad
git bisect bad

# Mark a known good commit
git bisect good v1.0.0

# Git will checkout commits for you to test
# After testing each commit, mark it:
git bisect good  # or
git bisect bad

# When done, Git shows the problematic commit
git bisect reset  # Return to original branch
```

**Pro tip:** Automate with a test script:
```bash
git bisect run npm test
```

### 7. Git Grep - Powerful Code Search

Search through your code like a pro:

```bash
# Basic search
git grep "TODO"

# Search in specific file types
git grep "console.log" -- "*.js"

# Search with line numbers
git grep -n "deprecated"

# Search in a specific branch
git grep "bugfix" feature-branch

# Search with context
git grep -B2 -A2 "error"
```

### 8. Git Fsck - Verify Repository Integrity

Check your repository's health and recover lost objects:

```bash
# Check repository integrity
git fsck

# Find unreachable objects
git fsck --unreachable

# Recover dangling commits
git fsck --lost-found
```

---

## Repository Management

### 9. Git Archive - Export Repository

Create a compressed archive of your repository:

```bash
# Create a tar archive of current HEAD
git archive --format=tar --output=project.tar HEAD

# Create a zip file of specific branch
git archive --format=zip --output=release.zip main

# Archive only specific directory
git archive HEAD src/ --output=src-only.tar
```

### 10. Git GC - Optimize Repository

Keep your repository running smoothly:

```bash
# Basic cleanup
git gc

# Aggressive optimization (takes longer)
git gc --aggressive

# Just prune loose objects
git gc --prune=now
```

### 11. Git LFS - Handle Large Files

Manage large files without bloating your repository:

```bash
# Track large files by extension
git lfs track "*.psd"
git lfs track "*.zip"

# View tracked patterns
git lfs track

# List tracked files
git lfs ls-files
```

---

## Advanced Operations

### 12. Git Cherry Pick - Selective Commit Import

Apply specific commits from other branches:

```bash
# Cherry pick a single commit
git cherry-pick abc1234

# Cherry pick multiple commits
git cherry-pick abc1234 def5678

# Cherry pick without committing
git cherry-pick -n abc1234
```

### 13. Git Submodules - Nested Repositories

Include other repositories within yours:

```bash
# Add a submodule
git submodule add https://github.com/user/repo lib/external

# Clone a project with submodules
git clone --recursive https://github.com/user/project

# Update all submodules
git submodule update --remote
```

### 14. Git Reflog - Recovery Time Machine

Never lose work again with reflog:

```bash
# View all HEAD changes
git reflog

# View specific branch reflog
git reflog show feature-branch

# Recover a lost commit
git checkout HEAD@{5}
```

---

## Utilities

### 15. Git Stripspace - Clean Whitespace

Clean up whitespace in files:

```bash
# Clean a file
git stripspace < messy.txt > clean.txt

# Remove comments too
git stripspace --strip-comments < file.txt

# Use in a pipeline
cat README.md | git stripspace
```

### 16. Git Show - Inspect Any Object

Display any Git object in human-readable form:

```bash
# Show a commit
git show abc1234

# Show a file from another branch
git show main:README.md

# Show a tag
git show v1.0.0
```

### 17. Git Diff - Advanced Comparisons

Beyond basic diff:

```bash
# Compare two branches
git diff main..feature

# Compare files across branches
git diff main:app.js feature:app.js

# Show changes from last week
git diff HEAD@{7.days.ago} HEAD

# Compare any two files (even non-git)
git diff --no-index file1.txt file2.txt
```

---

## Workflow Enhancement

### 18. Git Hooks - Automate Workflows

Automate tasks with Git hooks:

```bash
# Example: Pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
npm test
EOF

chmod +x .git/hooks/pre-commit
```

**Common hooks:**
- `pre-commit`: Run tests before committing
- `commit-msg`: Validate commit messages
- `post-merge`: Update dependencies after merge

### 19. Git Tag - Version Marking

Mark important points in history:

```bash
# Create a lightweight tag
git tag v1.0.0

# Create an annotated tag
git tag -a v1.0.0 -m "First stable release"

# Tag a specific commit
git tag -a v1.0.0 abc1234

# Push tags to remote
git push origin --tags
```

### 20. Git Log - Advanced History Viewing

View your repository's history with style:

```bash
# Beautiful graph view
git log --graph --pretty=oneline --abbrev-commit

# Show commits by author
git log --author="Jane"

# Search commit messages
git log --grep="bugfix"

# Show commits affecting a file
git log --follow -- src/app.js

# Compact summary
git shortlog -sn
```

---

## 🎁 Bonus Tools

### Git Standup
Remember what you did yesterday:

```bash
# Install: npm install -g git-standup
git standup
```

### Git Extras
70+ additional Git commands:

```bash
# Install: brew install git-extras
git changelog
git summary
git effort
```

### GitHub CLI
Manage GitHub from your terminal:

```bash
# Install: brew install gh
gh pr create
gh issue list
```

---

## 🚀 Quick Reference Card

| Command | Purpose | Example |
|---------|---------|---------|
| `git instaweb` | Web GUI | Browse repo visually |
| `git bisect` | Find bugs | Binary search commits |
| `git grep` | Code search | `git grep "TODO"` |
| `git blame` | Find author | `git blame -L 10,20 file` |
| `git reflog` | Recovery | Restore lost commits |
| `git cherry-pick` | Import commits | `git cherry-pick abc123` |
| `git archive` | Export repo | Create tar/zip files |

---

## 💡 Advanced Tips & Tricks

### 1. **Power Aliases for Daily Workflow**
Supercharge your productivity with these aliases:

```bash
# Interactive staging
git config --global alias.stage 'add -p'

# Pretty log with graph
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Undo last commit but keep changes
git config --global alias.undo 'reset HEAD~1 --mixed'

# Show all aliases
git config --global alias.aliases 'config --get-regexp alias'

# Amend without editing message
git config --global alias.amend 'commit --amend --no-edit'
```

### 2. **Git Worktrees - Multiple Branches Simultaneously**
Work on multiple branches without stashing:

```bash
# Create a new worktree
git worktree add ../feature-branch feature-branch

# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../feature-branch
```

### 3. **Advanced Stashing Techniques**
Beyond basic stash:

```bash
# Stash with a message
git stash save "WIP: implementing new feature"

# Stash only staged changes
git stash --keep-index

# Stash including untracked files
git stash -u

# Create a branch from stash
git stash branch new-feature-branch stash@{0}

# Apply specific file from stash
git checkout stash@{0} -- path/to/file
```

### 4. **Performance Optimization**
Speed up large repositories:

```bash
# Enable file system cache
git config core.fscache true

# Increase buffer size
git config http.postBuffer 524288000

# Enable parallel index preload
git config core.preloadindex true

# Use delta compression
git repack -a -d --depth=250 --window=250
```

### 5. **Security Best Practices**
Keep your repository secure:

```bash
# Sign commits with GPG
git config --global user.signingkey YOUR_GPG_KEY
git config --global commit.gpgsign true

# Remove sensitive data from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch PATH-TO-FILE" \
  --prune-empty --tag-name-filter cat -- --all

# Check for secrets before committing
# Install: https://github.com/awslabs/git-secrets
git secrets --install
git secrets --register-aws
```

### 6. **Git Maintenance Commands**
Keep your repository healthy:

```bash
# Run maintenance tasks
git maintenance start

# Verify connectivity and validity
git fsck --full

# Prune all unreachable objects
git prune --expire now

# Optimize repository database
git repack -a -d -f --depth=300 --window=300
```

### 7. **Debugging Like a Pro**
Advanced debugging techniques:

```bash
# Find commits that changed specific function
git log -L :functionName:path/to/file

# Show commit that created a file
git log --diff-filter=A -- path/to/file

# Find deleted files
git log --diff-filter=D --summary

# Trace line history
git log -L 15,20:path/to/file
```

### 8. **Powerful Git Configurations**
Customize Git behavior:

```bash
# Auto-correct typos
git config --global help.autocorrect 20

# Better diffs
git config --global diff.algorithm histogram

# Reuse recorded resolutions
git config --global rerere.enabled true

# Follow renames in diff
git config --global diff.renames true

# Color UI
git config --global color.ui auto
```

---

## Conclusion

Git is an incredibly powerful tool that goes far beyond basic version control. These 20 commands represent just a fraction of Git's capabilities, but mastering them will significantly enhance your development workflow.

Start with one or two commands that solve your immediate needs, then gradually expand your Git toolkit. Remember: with great power comes great responsibility - always understand what a command does before using it on important repositories!

**Happy coding!** 🚀

---

## Resources & Attribution

- **Original inspiration**: [20 Git Commands you (probably) didn't know](https://www.aliciasykes.com/blog/20-git-commands-you-probably-didnt-know-) by Alicia Sykes
- **Official Git Documentation**: [git-scm.com/docs](https://git-scm.com/docs)
- **Pro Git Book**: [git-scm.com/book](https://git-scm.com/book)
- **Git Extras**: [github.com/tj/git-extras](https://github.com/tj/git-extras)
- **GitHub CLI**: [cli.github.com](https://cli.github.com)

---
