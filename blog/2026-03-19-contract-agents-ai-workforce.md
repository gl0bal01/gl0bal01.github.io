---
slug: contract-agents-ai-workforce
title: "Contract Agents: 125 AI Specialists That Actually Follow the Rules"
authors: gl0bal01
tags: [ai, coding, productivity]
keywords: [contract agents, ai agents, claude code, multi-agent systems, ai workforce, agent contract, ai coding assistants, kilo cli, goose, opencode, developer productivity, agent orchestration]
description: "AI agents are powerful but chaotic — they hallucinate workflows, ignore constraints, and forget rules between sessions. Contract Agents solves this with 125 specialized agents governed by a single shared contract."
date: 2026-03-19
---

You ask an AI agent to refactor a module. It rewrites half the codebase. You ask it to fix a bug. It adds three features you didn't request. You ask it to deploy. It force-pushes to main.

AI agents have a discipline problem. **Contract Agents** is the fix.

<!-- truncate -->

## The Problem

AI coding agents are getting powerful fast. But power without discipline is a liability. Here's what actually happens in practice:

- **Scope creep** — Ask for a one-line fix, get a 500-line refactor
- **Inconsistency** — Same task, different agent, wildly different approach
- **Silent risk** — Destructive operations without asking, secrets committed, hooks bypassed
- **No verification** — "Done!" (nothing was tested)
- **Amnesia** — Corrections from yesterday are forgotten today

The root cause? Every agent operates in a vacuum. No shared rules, no accountability, no structure. It's like hiring 125 contractors and giving none of them an employee handbook.

## The Solution: One Contract to Rule Them All

**[Contract Agents](https://github.com/gl0bal01/contract-agents)** is a system of 125 specialized AI agents across 10 divisions — all governed by a single shared contract: `AGENTS_CONTRACT.md`.

```
┌─────────────────────────────────────────────┐
│         CONTRACT-AGENTS                     │
│                                             │
│   125 AI Agents • 10 Divisions • 1 Contract │
│                                             │
│   eng-*  test-*  design-*  mkt-*  prod-*    │
│   pm-*   game-*  spatial-*  spec-* support- │
└─────────────────────────────────────────────┘
```

The contract isn't a suggestion — it's the employee handbook. Every agent loads it before doing anything. It enforces:

| Rule | What It Prevents |
|------|------------------|
| **Scope Discipline** | Touch only what's required — no drive-by refactors |
| **Confusion Management** | Stop on ambiguity, ask clarifying questions |
| **Evidence Rules** | Claims require proof — `file:line` for code, URLs for research |
| **Approval Gates** | Hard stops before destructive operations |
| **Verification Chain** | Automated → tests → full → manual — in that order |
| **Commit Discipline** | Safe, bisectable git history |
| **Self-Improvement** | Agents learn from your corrections |

## Think of It Like a Company

You're the executive. You set direction. The agents do the work.

| Component | Role |
|-----------|------|
| You | Executive — sets goals and direction |
| `AGENTS_CONTRACT.md` | Employee handbook — how everyone works |
| `contract-orchestrator` | Project manager — coordinates multi-agent workflows |
| `pm-senior` | Strategic advisor — helps you plan |
| Division agents (`eng-*`, `test-*`, etc.) | Specialists you delegate to |

The orchestrator doesn't just start working — it presents a proposed pipeline (which agents, in what order, and why) and **waits for your approval** before delegating anything.

## 10 Divisions, 125 Specialists

Each agent is minimal by design. Domain-specific rules only — everything shared lives in the contract. No bloat, no duplication.

| Division | Prefix | Count | Examples |
|----------|--------|-------|----------|
| Engineering | `eng-*` | 23 | frontend, backend, devops, security, mobile, AI/ML |
| Testing & QA | `test-*` | 11 | penetration testing, API testing, accessibility, Docker security |
| Design | `design-*` | 8 | UI, UX research, brand, visual storytelling |
| Marketing | `mkt-*` | 17 | SEO, growth hacking, social media, content |
| Product | `prod-*` | 5 | competitive intel, feedback synthesis, sprint planning |
| Project Management | `pm-*` | 7 | Jira workflows, studio ops, indie business strategy |
| Game Dev | `game-*` | 19 | Unity, Unreal, Godot, Roblox, narrative, audio |
| Spatial Computing | `spatial-*` | 6 | visionOS, WebXR, Metal, spatial interfaces |
| Specialized | `spec-*` | 22 | forensics, blockchain audit, compliance, architecture |
| Support | `support-*` | 6 | legal, finance, infrastructure, customer support |

## What Makes This Different

**Most "agent" projects are single mega-prompts.** They cram everything into one system prompt and hope for the best. Contract Agents takes the opposite approach:

1. **Separation of concerns** — Each agent has one job. The contract handles shared behavior.
2. **Agent files are tiny** — Shared rules live in the contract, not duplicated across 125 files.
3. **Cross-tool compatibility** — Same agents work in Claude Code, Kilo CLI, Goose, and OpenCode.
4. **Human-guided** — Nothing happens without your direction. Agents propose, you approve.

## Quick Start

```bash
# Clone and install globally
git clone https://github.com/gl0bal01/contract-agents.git
cd contract-agents
make install

# Or install to a specific tool
make install-claude
make install-kilo
make install-goose
make install-opencode

# Or install per-project
make install SCOPE=local LOCAL_PATH=~/my-project

# Or install just one division
make install-claude DIVISION=eng
```

Manual install is just as simple — copy the agent markdown files to your tool's agents directory:

```bash
cp agents/*.md ~/.claude/agents/     # Claude Code
cp agents/*.md ~/.kilo/agents/       # Kilo CLI
cp agents/*.md ~/.goose/agents/      # Goose
```

## Usage

**Don't know where to start?** Three options:

```
# Let the orchestrator figure it out
"Use contract-orchestrator to coordinate building a new API service"

# Get strategic direction first
"Use pm-senior to plan this feature and identify which agents to use"

# Direct delegation when you know what you need
"Use eng-backend-architect to design the database schema"
"Use test-penetration-tester to audit the auth system"
"Use mkt-seo-strategist to optimize the landing page"
```

## The Bottom Line

AI agents without rules are liabilities. AI agents with a shared contract are a workforce.

125 specialists. 10 divisions. 1 contract. You set the direction — they do the work. That's the deal.

---

**Open source (MIT). Works with Claude Code, Kilo CLI, Goose, and OpenCode. [github.com/gl0bal01/contract-agents](https://github.com/gl0bal01/contract-agents)**
