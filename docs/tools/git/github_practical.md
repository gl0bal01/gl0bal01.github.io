---
id: git-practical-examples
title: "Git Practical Examples: Quick Reference for Developers"
sidebar_label: "Practical Examples"
sidebar_position: 2
description: "Essential Git commands with 45 practical examples covering repository setup, daily workflows, branching, collaboration, and advanced operations"
keywords:
  - git
  - version control
  - github
  - gitlab
  - bitbucket
  - repository management
  - branching
  - merging
  - collaboration
  - workflow
  - devops
authors: [gl0bal01]
tags: [Development, Productivity]
date: 2024-06-18
---

# Git Practical Examples

## Repository Setup & Configuration
_Set up a new or existing repository, configure user identity, and manage remote connections for secure collaboration._

```bash
# 1. Initialize new repository
git init
git init my-project

# 2. Clone existing repository
git clone https://github.com/user/repo.git
git clone git@github.com:user/repo.git

# 3. Configure user identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# 4. Set up remote repositories
git remote add origin https://github.com/user/repo.git
git remote -v

# 5. Configure SSH keys for GitHub
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub  # Add to GitHub
```

## Daily Development Workflow
_Perform everyday tasks such as branching, committing, pushing, pulling, and checking repository status._

```bash
# 6. Create and switch branches
git checkout -b feature/new-feature
git switch -c feature/new-feature  # Git 2.23+

# 7. Stage and commit changes
git add file.txt
git add .
git commit -m "Add new feature"

# 8. Push changes to remote
git push origin feature/new-feature
git push -u origin feature/new-feature  # Set upstream

# 9. Pull latest changes
git pull origin main
git pull  # If upstream is set

# 10. Check repository status
git status
git status -s  # Short format

# 11. View commit history
git log --oneline
git log --graph --oneline --all
```

## Branch Management
_Create, manage, merge, rename, and delete branches to organize and integrate development work._

```bash
# 12. Create feature branches
git checkout -b feature/user-auth
git checkout -b hotfix/bug-123 main

# 13. Merge branches
git checkout main
git merge feature/user-auth
git merge --no-ff feature/user-auth  # No fast-forward

# 14. Delete branches
git branch -d feature/user-auth  # Safe delete
git branch -D feature/user-auth  # Force delete
git push origin --delete feature/user-auth  # Delete remote

# 15. Rename branches
git branch -m old-name new-name
git branch -m new-name  # Rename current branch

# 16. Track remote branches
git checkout -b local-branch origin/remote-branch
git branch --set-upstream-to=origin/main main
```

## Collaboration Workflows
_Work effectively with others using forks, pull requests, code reviews, and conflict resolution._

```bash
# 17. Fork and contribute to projects
gh repo fork owner/repo --clone
git remote add upstream https://github.com/original/repo.git

# 18. Create pull requests
gh pr create --title "Fix bug" --body "Description"
git push origin feature/fix && gh pr create

# 19. Handle merge conflicts
git merge feature/branch
# Edit conflicted files, then:
git add .
git commit

# 20. Sync fork with upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 21. Code review workflow
gh pr checkout 123
gh pr review 123 --approve
gh pr merge 123 --squash
```

## Undo & Recovery Operations
_Recover from mistakes by undoing commits, resetting history, restoring files, or finding lost work._

```bash
# 22. Undo last commit
git reset --soft HEAD~1  # Keep changes staged
git reset HEAD~1         # Keep changes unstaged
git reset --hard HEAD~1  # Discard changes

# 23. Discard local changes
git checkout -- file.txt
git restore file.txt     # Git 2.23+
git clean -fd            # Remove untracked files

# 24. Reset to previous commit
git reset --hard abc1234
git reset --hard HEAD~3

# 25. Recover deleted files
git checkout HEAD -- deleted-file.txt
git restore --source=HEAD~1 file.txt

# 26. Find lost commits with reflog
git reflog
git reset --hard HEAD@{2}
```

## Stashing & Temporary Storage
_Save uncommitted changes temporarily and resume work later without losing progress._

```bash
# 27. Stash work in progress
git stash
git stash push -m "Work in progress"
git stash -u  # Include untracked files

# 28. Apply and manage stashes
git stash pop
git stash apply stash@{1}
git stash list
git stash drop stash@{1}

# 29. Create branch from stash
git stash branch new-feature stash@{1}
```

## Advanced Git Operations
_Use advanced tools like rebase, cherry-pick, and commit splitting for cleaner, more controlled history._

```bash
# 30. Interactive rebase
git rebase -i HEAD~3
git rebase -i main

# 31. Cherry-pick commits
git cherry-pick abc1234
git cherry-pick abc1234..def5678

# 32. Squash multiple commits
git rebase -i HEAD~3  # Mark commits as 'squash'
git reset --soft HEAD~3 && git commit

# 33. Amend commit messages
git commit --amend -m "New message"
git commit --amend --no-edit  # Keep message

# 34. Split large commits
git reset --soft HEAD~1
git add -p  # Stage parts interactively
git commit -m "Part 1"
```

## Release Management
_Tag versions, generate changelogs, and publish releases to mark progress and distribute code._

```bash
# 35. Create and manage tags
git tag v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
git push --tags

# 36. Generate changelogs
git log --oneline v1.0.0..v1.1.0
git log --pretty=format:"- %s" v1.0.0..HEAD

# 37. Create releases
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes"
git archive --format=zip --output=release.zip HEAD

# 38. Semantic versioning workflow
git tag -a v1.2.3 -m "Patch release"
npm version patch && git push --follow-tags
```

## Debugging & Investigation
_Inspect changes, search history, identify contributors, and isolate bugs through Git's powerful history tools._

```bash
# 39. Find who changed what (git blame)
git blame file.txt
git blame -L 10,20 file.txt

# 40. Search commit history
git log --grep="bug fix"
git log --author="John"
git log --since="2024-01-01"

# 41. Compare file versions
git diff HEAD~1 file.txt
git diff branch1..branch2
git show abc1234:file.txt

# 42. Find bugs with git bisect
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
git bisect reset
```

## Large Files & Performance
_Handle large assets with Git LFS, clean up history, and optimize performance of your repository._

```bash
# 43. Use Git LFS for large files
git lfs track "*.zip"
git add .gitattributes
git lfs ls-files

# 44. Clean up repository history
git gc --aggressive
git filter-repo --path large-file.zip --invert-paths

# 45. Optimize repository size
git count-objects -vH
git remote prune origin
git repack -ad
```

Each example shows the most essential command(s) for that use case, with common variations where helpful.