---
slug: why-intel-codex
title: "Why I Built Intel Codex"
authors: gl0bal01
description: "The story behind creating a comprehensive operational manual for digital investigators, security analysts, and OSINT practitioners."
tags: [osint, security, cybersecurity]
date: 2025-10-26
---

import Highlight from '@site/src/components/Highlight';

As an autodidact solver, developer, architect, and CTF jeopardy competitor working across digital investigations and security operations, I kept running into the same problem: **fragmented knowledge**. Every investigation meant digging through scattered bookmarks, old notes, and half-remembered techniques.

Every new team member needed months to learn the same procedures. Every case required rebuilding the same templates from scratch.

<!-- truncate -->

## The Problem

<ins>The OSINT and security communities have incredible tools and techniques, but they're spread across:</ins>

- Reddit threads from 2019
- Twitter screenshots
- Personal notes that make sense to no one else
- Tribal knowledge that lives in someone's head

When you're mid-investigation and need to remember the proper chain of custody procedure, or the legal boundaries for scraping a social platform, or how to structure a financial AML case — you shouldn't need to Google for 20 minutes and hope you find the right answer.

## The Solution

<Highlight>**Intel Codex** is the operational manual I wish I'd had from day one. It's:</Highlight>

- **20+ SOPs** covering everything from Twitter investigations to Active Directory pentesting
- **Platform-specific guides** for the major social networks
- **Case studies** showing real investigation workflows
- **Legal and ethical frameworks** built into every procedure
- **Copy-paste ready** commands for Windows, Linux, and macOS

It's designed for the moment you're in the middle of work and need answers fast.

## Beyond OSINT: Full-Spectrum Security

<Highlight block>One deliberate choice was treating **security operations as a first-class citizen** alongside OSINT investigations.</Highlight>

The Security Index bridges both offensive and defensive work:


<ins>**Analysis domain:**</ins>
- Malware analysis (static/dynamic, IOC extraction)
- Reverse engineering (binary analysis, protocol dissection)
- Forensics investigation (incident response, timeline analysis)
- Cryptography analysis (implementation audits)
- AI/ML vulnerability research (adversarial attacks, prompt injection)

<ins>**Pentesting domain:**</ins>
- Infrastructure (Linux privilege escalation, Active Directory compromise)
- Applications (Web app security, mobile security, firmware reverse engineering)
- Offensive research (vulnerability discovery, bug bounty, detection evasion)

<Highlight block>Most security resources treat these as separate disciplines. But real-world work doesn't respect those boundaries. An OSINT investigation into a threat actor often leads to malware samples. A penetration test reveals evidence that requires forensic procedures. An incident response needs both defensive analysis and offensive thinking.</Highlight>

:::info
Intel Codex gives you the operational procedures for all of it, with proper authorization checklists, evidence handling standards, and responsible disclosure frameworks built in.
:::

## Why Obsidian

I built this in [Obsidian](https://obsidian.md) because knowledge isn't linear. Investigations jump between platforms, techniques, and evidence types. You need to see connections: how OPSEC planning relates to platform SOPs, how entity dossiers connect to collection logs, how malware analysis ties into forensic investigations.

Plain text Markdown means it's searchable, versionable, and doesn't lock you into proprietary formats.

## What's Next

Intel Codex reflects current best practices and stays actively maintained. As investigation techniques evolve, so does the manual. The [6 learning paths](https://github.com/gl0bal01/intel-codex#-learning-paths) give structured progression from beginner to advanced across different specializations.

If you're doing digital investigations, security analysis, or OSINT work, it's available now at [github.com/gl0bal01/intel-codex](https://github.com/gl0bal01/intel-codex) or partialy on the website [here](https://gl0bal01.com/intel-codex).

The goal isn't to teach you everything about OSINT or security — it's to give you the operational procedures so you can focus on the actual investigation instead of figuring out how to do it properly.

**Looking for tools?** I also maintain curated start pages with essential resources:
- [OSINT Starter Collection](https://start.me/p/vw6wOP/osint) — Investigation tools, search engines, and platform resources
- [Red Team Collection](https://start.me/p/n7MNd9/red) — Pentesting tools, exploit databases, and offensive security resources

---

*Start with the fundamentals: [Legal & Ethics Review](https://github.com/gl0bal01/intel-codex/blob/main/Investigations/Techniques/sop-legal-ethics.md) and [OPSEC Planning](https://github.com/gl0bal01/intel-codex/blob/main/Investigations/Techniques/sop-opsec-plan.md). Everything else builds from there.*
