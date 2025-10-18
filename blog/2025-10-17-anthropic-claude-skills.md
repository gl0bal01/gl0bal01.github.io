---
slug: anthropic-claude-skills
title: "Claude Skills — Packaged workflows that make Claude truly work-ready"
authors: gl0bal01
description: "Overview of Anthropic’s new Claude Skills: what they are, why they matter, how they differ from prompts, where they run (Claude.ai, Claude Code, API/Agent SDK), and how to get started."
tags: [Claude, Agents]
date: 2025-10-17
---

import Youtube from '@site/src/components/Youtube';

[**Claude Skills**](https://www.anthropic.com/news/skills) are reusable, versionable “capsules” of task-specific instructions plus optional files and scripts that Claude can load on demand across **Claude.ai**, **Claude Code**, the **API**, and the **Claude Agent SDK**. They’re built as simple folders (with a `SKILL.md` manifest) that encode your team’s procedures and resources so Claude can act consistently in your real workflows. Skills are rolling out for paid plans (Pro/Max/Team/Enterprise) and can be enabled by admins for org-wide use.

<!-- truncate -->

## What is a Skill?

A **Skill** packages the context Claude needs to do a job “the way your org does it”: instructions, checklists, templates, scripts, and reference artifacts. Instead of cramming everything into a giant system prompt, you keep a tidy folder that Claude selectively loads when relevant. Anthropic positions this as a step toward **practical, company-aware agents**, not just general chat.

---
<Youtube videoId="kS1MJFZWMq4" />
---

### Why this matters

- **Consistency at scale:** Everyone invokes the same procedure; fewer “hallucinated” steps or off-brand outputs.  
- **Speed & cost:** Claude routes to the right Skill and loads only the resources needed, reducing token bloat vs. giant prompts.  
- **Portability:** The same Skill works in Claude.ai, **Claude Code** (local dev), and via API/Agent SDK.

---

## Where Skills run

- **Claude.ai (web):** Toggle **Skills** in Settings. Team/Enterprise admins can enable Skills org-wide.  
- **Claude Code:** Install Skills from the `anthropics/skills` marketplace or drop folders into `~/.claude/skills`; they auto-load when relevant. Share via version control.  
- **API & Agent SDK:** Same Skills model for building custom agents; initial Anthropic-managed Skills include office docs (PowerPoint, Excel, Word) and PDF handling.

> **Note:** Several early partners (e.g., Box) are announcing Skills support and agentic document creation workflows that tap your enterprise files.

---

## Skills vs. “just a system prompt”

| Capability | System Prompt | **Claude Skill** |
|---|---|---|
| Structure | One big string | **Folder** with `SKILL.md` + assets |
| Modularity | Low | **High** (compose, version, reuse) |
| Routing | Manual | **Automatic relevance loading** |
| Files & scripts | Ad-hoc links | **Co-located artifacts** |
| Multi-surface | Manual copy/paste | **Claude.ai, Claude Code, API/SDK** |

Independent commentators highlight that Skills shift best practice from mega-prompts to **structured, maintainable** capsules.

---

## Core concepts

- **`SKILL.md`** — human-readable manifest: intent, instructions, guardrails, inputs/outputs, and references.  
- **Resources** — templates, brand guides, spreadsheets, scripts, and sample data stored alongside the manifest.  
- **Relevance & loading** — Claude identifies when a Skill applies and loads it progressively, keeping context lean.

---

## Getting started (fast path)

1. **Enable Skills** in Claude.ai settings (admins can flip this org-wide for Team/Enterprise).  
2. In **Claude Code**, create a new Skill or install from the marketplace; you can also drop a folder into `~/.claude/skills`.  
3. For **API/Agent SDK**, include your Skills in the agent config and route tasks through Anthropic’s Skills runtime (see release notes).

---

## Example: Brand-safe Instagram copy Skill

**Folder layout**
```
brand-safe-instagram/
├─ SKILL.md
├─ brand-voice.md
├─ banned-phrases.txt
├─ legal/claims-policy.md
└─ templates/
   ├─ caption.mst
   └─ hashtag-list.csv
```

**`SKILL.md` (excerpt)**
```md
# Brand-Safe Instagram Copy
## Purpose
Generate short Instagram captions that match our brand voice, comply with claims policy, and include approved hashtags.

## Inputs
- Product name, key benefits, target persona, mood.

## Procedure
1. Read `brand-voice.md`; follow tone and style.
2. Never use phrases listed in `banned-phrases.txt`.
3. If a benefit implies a regulated claim, consult `legal/claims-policy.md` and rewrite to compliant alternatives.
4. Produce 3 caption options using `templates/caption.mst` and include 8–12 tags limited to `templates/hashtag-list.csv`.

## Output
- `captions`: array of 3 strings + rationale for choices.
```

This encapsulates instructions, guardrails, and templates that Claude can reliably load in chat, in Claude Code, or via your agent.

---

## Built-in & ecosystem Skills

Anthropic is shipping **managed Skills** for common office docs—**PowerPoint, Excel, Word, PDF**—as part of the first API/SDK release, with wider marketplace distribution for Claude Code. Expect partner Skills from content and storage platforms (e.g., Box AI) to follow.

---

## Pricing & availability

Skills are rolling out on paid tiers (Pro, Max, Team, Enterprise). Admins must enable Skills for org-wide use on Team/Enterprise. Check Anthropic’s announcement & release notes for the most current plan details.

---

## How Skills interact with your stack

- **Microsoft 365 & MCP:** Anthropic is expanding enterprise integrations, with Microsoft embracing **Model Context Protocol (MCP)** so agents (including Claude) can securely reach into Outlook, Teams, Word, SharePoint, and OneDrive—prime territory for Skills to orchestrate structured work.  
- **Enterprise search:** New connectors help Claude fetch the right context from your knowledge bases; Skills then apply your procedures on top.

---

## Governance & safety

Skills make it easier to **codify approvals and compliance** (e.g., “Claims must cite doc X,” “Use only templates in folder Y”). Centralizing these rules in a Skill cuts drift and helps reviewers audit what the agent was instructed to do. This aligns with Anthropic’s pitch for **real-world procedural agents** over raw LLM power.

---

## FAQ

**How are Skills different from MCP tools or function calling?**  
MCP and function calling expose *capabilities* (APIs, tools). A **Skill** packages *procedures + resources*—what to do and how—then lets Claude **selectively load** that context wherever you use it. Many teams will use Skills **and** MCP together.

**Do Skills work offline in Claude Code?**  
Claude Code installs Skills locally (e.g., `~/.claude/skills`) and will auto-load relevant ones; behavior still depends on the model session for generation and any external calls your scripts trigger.

**Can I share Skills with my team?**  
Yes—version control a folder repo, or publish to the marketplace for Claude Code. Admins can enable Skills org-wide in Claude.ai.

**Any examples of real companies?**  
Partners like **Box** have announced agentic document creation and forthcoming Skills support; media coverage notes other early adopters exploring workplace workflows.

---

## Authoring checklist

- Define the **job-to-be-done** and outcome.  
- Write clear, stepwise procedure in `SKILL.md`.  
- Attach **templates**, **style guides**, **banned lists**, and **example inputs/outputs**.  
- Add guardrails and escalation points (“ask legal if …”).  
- Version your Skill; ship via repo / marketplace; enable telemetry & review.

---

## Further reading

- **Anthropic announcement** — “Claude Skills: Customize AI for your workflows.”  
- **Engineering deep-dive** — “Equipping agents for the real world with Agent Skills.”  
- **Release notes** — Agent Skills (`skills-2025-10-02` beta), with initial managed Skills for Office/PDF.  
- **News & analysis** — VentureBeat explainer; The Verge coverage of Skills & enterprise integrations; industry commentary.

---

*If you’re adopting Skills in a newsroom, dev shop, or brand studio and want a ready-to-fork starter repo (`SKILL.md` scaffolds, templates, CI checks), you've got one you can clone in [under a minute](https://github.com/anthropics/skills).*
