---
slug: contract-agents-ai-workforce
title: "Contract Agents v3.0: 52 AI Specialists That Follow the Rules"
authors: gl0bal01
tags: [ai, coding, productivity]
keywords: [contract agents, ai agents, claude code, multi-agent systems, ai workforce, agent contract, ai coding assistants, kilo cli, goose, opencode, developer productivity, agent orchestration]
description: "AI agents are powerful but chaotic — they hallucinate workflows, ignore constraints, and forget rules between sessions. Contract Agents v3.0 cuts to 52 dense specialists governed by a single shared contract."
date: 2026-03-19
---

You ask an AI agent to fix a bug. It fixes the bug, refactors three unrelated functions, renames some variables "for clarity", and force-pushes to main. You ask it to deploy. It does — to production, without asking, because you didn't say not to.

AI agents have a discipline problem. They're powerful, and that power without guardrails is genuinely dangerous. Not in the science fiction sense — in the "I now have to spend two hours reverting a cascade of well-intentioned changes I never requested" sense.

The root cause is that every agent operates in a vacuum. No shared rules, no accountability, no memory of corrections. It's like hiring contractors and giving none of them an employee handbook, then being surprised when they all work differently.

**[Contract Agents v3.0](https://github.com/gl0bal01/contract-agents)** is the handbook. 52 specialized agents across 8 divisions, all governed by one shared contract. The agents don't decide how to behave — the contract does.

<!-- truncate -->

## One Contract, Everything Inherits From It

```
┌─────────────────────────────────────────────┐
│         CONTRACT-AGENTS  v3.0               │
│                                             │
│   52 AI Agents • 8 Divisions • 1 Contract   │
│                                             │
│   eng-*  test-*  design-*  mkt-*  prod-*    │
│   pm-*   game-*  spec-*                     │
└─────────────────────────────────────────────┘
```

`AGENTS_CONTRACT.md` opens with: *"Shared rules for all agents. Individual agent files add domain-specific rules on top. When instructions conflict, this contract wins."*

Every agent loads it before doing anything. The individual agent files are minimal — shared behavior lives in the contract, each specialist only adds what's specific to their domain. This means no behavioral drift between agents, and corrections to the contract propagate everywhere.

What the contract enforces:

| Rule | What It Prevents |
|------|------------------|
| **Scope Discipline** | Touch only what's required — no drive-by refactors |
| **Confusion Management** | Stop on ambiguity, ask clarifying questions |
| **Evidence Rules** | Claims require proof — `file:line` for code, URLs for research |
| **Approval Gates** | Hard stops before destructive operations |
| **Verification Chain** | Automated → tests → full → manual — in that order |
| **Commit Discipline** | Safe, bisectable git history |
| **Self-Improvement** | Agents learn from your corrections |

The Approval Gates rule is the one that matters most for the force-push-to-main problem. The agent literally stops and waits. You approve or you don't. It doesn't decide for you.

## Think of It Like a Company

You're the executive. You set direction. The agents do the work.

| Component | Role |
|-----------|------|
| You | Executive — sets goals and direction |
| `AGENTS_CONTRACT.md` | Employee handbook — how everyone works |
| `contract-orchestrator` | Project manager — coordinates multi-agent workflows |
| `pm-senior` | Strategic advisor — helps you plan |
| Division agents (`eng-*`, `test-*`, etc.) | Specialists you delegate to |

The orchestrator doesn't just start working — it presents a proposed pipeline (which agents, in what order, and why) and waits for your approval before delegating anything. That pause is intentional. It's where you course-correct before the work is already done.

## 8 Divisions, 52 Specialists

Each agent encodes specific failure modes, named thresholds, or distinct workflow lanes — not just job titles. The question I asked for every one: *does this encode knowledge the model would otherwise miss, or a distinct workflow lane worth reserving?* v3.0 cut 58% of the previous roster on that basis. The ones that survived are dense.

| Division | Prefix | Examples |
|----------|--------|----------|
| Engineering | `eng-*` | frontend, backend, devops, security, mobile, git-workflow, database-migration, kubernetes, api-designer, rust, go |
| Testing & QA | `test-*` | penetration testing, API testing, accessibility, load testing |
| Design | `design-*` | UI (token-first, WCAG AA), UX architecture, brand |
| Marketing | `mkt-*` | SEO, growth, social media, email deliverability, YouTube strategy |
| Product | `prod-*` | competitive intel, feedback synthesis, pricing strategy |
| Project Management | `pm-*` | sprint planning, indie business strategy |
| Game Dev | `game-*` | Unity, Godot, Unreal, narrative, audio |
| Specialized | `spec-*` | forensics, blockchain audit, compliance |

**v3.0 additions worth knowing:** `eng-rust-engineer` (borrow checker, async runtime, unsafe contracts), `eng-database-migration-specialist` (expand-contract pattern, replica-lag-aware backfills), `eng-kubernetes-operator` (liveness-probe gotchas, PDBs, QoS classes), `test-load-tester` (p50/p95/p99 reporting, CI regression gating), `prod-pricing-strategist` (Van Westendorp PSM, decoy pricing, cohort testing).

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

Manual install — just copy the markdown files to your tool's agents directory:

```bash
cp agents/*.md ~/.claude/agents/     # Claude Code
cp agents/*.md ~/.kilo/agents/       # Kilo CLI
cp agents/*.md ~/.goose/agents/      # Goose
```

## Using It

Three entry points depending on how much you know upfront:

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

A concrete session: I needed a database migration with backward compatibility, tests, and a brief doc update. Three agents — `eng-database-migration-specialist`, `test-reality-checker`, `spec-compliance-auditor` — coordinated by the orchestrator. It proposed the pipeline, I approved, each agent touched only its lane. No one renamed my variables.

---

Works with Claude Code, Kilo CLI, Goose, and OpenCode. AI agents without rules are liabilities; with a shared contract, they're a workforce. Check it out: **[github.com/gl0bal01/contract-agents](https://github.com/gl0bal01/contract-agents)**
