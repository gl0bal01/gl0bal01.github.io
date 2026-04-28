---
slug: intel-codex-v2
title: "Intel Codex v2.0: 41 SOPs, Cloud Forensics, and Blockchain Tracing"
authors: gl0bal01
description: "Intel Codex v2.0 expands to 41 SOPs with 11 new procedures covering cloud forensics, SaaS log analysis, blockchain tracing, mixer attribution, and container/Kubernetes pentesting."
keywords: [intel codex, osint manual, digital investigation, cloud forensics, blockchain investigation, saas forensics, bec forensics, kubernetes pentest, wireless pentest, smart contract audit, obsidian vault, security operations]
tags: [osint, security]
date: 2026-04-28
---

import Highlight from '@site/src/components/Highlight';

A real malware analysis job. The trail went sample → strings → network IOCs → C2 infrastructure → on-chain. The funds went through a mixer.

Halfway through that chain I realized I had solid SOPs for the first half and absolutely nothing written down for the back half. Blockchain address clustering, mixer heuristics, bridge read-flow, how to structure on-chain evidence for court admissibility — I was building all of it on the fly. I finished the job, wrote down what I'd worked out, and that became the seed for what's now in v2.0.

Intel Codex v2.0 ships 11 new SOPs. Most of them exist because a real investigation or assessment hit the edge of what v1.0 covered.

<!-- truncate -->

## By the Numbers

<Highlight>41 SOPs — 20 Investigation Guides · 21 Security Procedures · 9 CTF Resources</Highlight>

| Domain | v1.0 | v2.0 | What's new |
|--------|------|------|------------|
| Investigations / Platforms | 7 | 8 | Discord |
| Investigations / Techniques | 9 | 12 | Dark web, blockchain tracing, mixer attribution |
| Security / Analysis | 6 | 10 | Smart contract audit, cloud forensics, SaaS logs, email BEC |
| Security / Pentesting | 8 | 11 | Cloud pentest, wireless/RF, container/K8s |

## What's New

### Investigations

**sop-platform-discord** — snowflake-ID timestamp extraction, DiscordChatExporter ToS framing, webhook discovery, voice-channel surveillance discipline, hard stop for sensitive-crime material.

**sop-darkweb-investigation** — Tor/I2P navigation, hidden-service enumeration, marketplace OSINT, vendor PGP pivots, ransomware leak-site tracking.

**sop-blockchain-investigation** — multi-chain tracing, address clustering, bridge read-flow, sanctions integration, court-admissibility via the Sterlingov framework. This is the SOP I was missing halfway through that job.

**sop-mixer-tracing** — CoinJoin clustering attacks, Tornado Cash on-chain heuristics, cross-chain bridge obfuscation patterns, privacy-coin research limits, regulatory timeline. The part that came after.

### Security Analysis

**sop-smart-contract-audit** — full audit lifecycle, SWC registry, vulnerability classes (reentrancy, oracle manipulation, MEV, upgrade, governance), tooling (Slither, Echidna, Foundry, Halmos), formal verification.

**sop-cloud-forensics** — IaaS-plane forensics across AWS/Azure/GCP: control-plane log collection, IAM principal-action reconstruction, region-sweep, log-tampering detection, container-runtime artifacts.

**sop-saas-log-forensics** — M365 UAL + Purview, Workspace Reports + Vault, Okta System Log + ITP, Slack Audit + Discovery, Salesforce Setup Audit Trail, GitHub/GitLab audit, OAuth consent-grant abuse.

**sop-email-bec-forensics** — header forensics, SPF/DKIM/DMARC/ARC mechanics, lookalike-domain detection, M365/Workspace message-trace, secure-email-gateway forensics, wire-recall pathway, BEC scenario taxonomy.

### Pentesting

**sop-cloud-pentest** — AWS/Azure/GCP offensive: IAM enumeration, federated-trust abuse, metadata-service exploitation, Workload Identity bridges. Includes SaaS collaboration plane (M365, Workspace, Slack, Salesforce, GitHub offensive).

**sop-wireless-rf-pentest** — Wi-Fi, Bluetooth, Zigbee, Matter, SDR, and NFC authorized testing procedures.

**sop-container-k8s-pentest** — pod escapes, RBAC abuse, admission-controller bypass, Workload Identity → cloud bridge, runtime CVE landscape (Leaky Vessels), supply-chain persistence.

## Why This Grouping

<Highlight block>The v2.0 additions follow a single thread: **modern infrastructure is multi-layer**, and investigations and attacks increasingly cross those layers.</Highlight>

A BEC investigation means email header forensics, then M365 UAL analysis, then potentially blockchain tracing if funds moved on-chain — and then mixer tracing if they went through Tornado Cash. That's four SOPs in sequence. A cloud pentest ends at Workload Identity bridges into SaaS platforms. A smart contract audit requires the same adversarial thinking as a web pentest but with different tooling and completely different court-admissibility standards.

v1.0 covered the start of those chains well. v2.0 covers where they go next.

:::info
Each new SOP includes proper authorization checklists, evidence-handling standards, and responsible disclosure frameworks — not just technique lists.
:::

## Get It

Intel Codex v2.0 is at [github.com/gl0bal01/intel-codex](https://github.com/gl0bal01/intel-codex) and partially mirrored at [gl0bal01.com/intel-codex](https://gl0bal01.com/intel-codex).

New to Intel Codex? Start with [Legal & Ethics Review](https://github.com/gl0bal01/intel-codex/blob/main/Investigations/Techniques/sop-legal-ethics.md) and [OPSEC Planning](https://github.com/gl0bal01/intel-codex/blob/main/Investigations/Techniques/sop-opsec-plan.md). Everything else builds from there.
