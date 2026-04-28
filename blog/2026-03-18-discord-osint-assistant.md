---
slug: discord-osint-assistant
title: "Discord OSINT Assistant v2.1: 31 Commands for Team OSINT"
authors: gl0bal01
tags: [osint, tools, coding]
keywords: [discord osint bot, osint discord, sherlock discord, username search discord, dns lookup discord, blockchain osint, image forensics discord, maigret, ghunt, nuclei discord, discord bot security]
description: "31 OSINT slash commands for Discord — username searches, DNS, blockchain, image forensics, flight tracking, JWT analysis, and more. v2.1.0 is a full security hardening pass: no-shell process spawning, SSRF protection, permission gating, guild whitelist, and Docker hardening."
date: 2026-03-18
---

OSINT CTFs are a team sport, and the bottleneck is almost never knowledge — it's coordination. During a competition, our team was hitting maritime challenges, aviation challenges, username enumeration, the full spread. And a significant chunk of time just evaporated into "which tool do I use for this?" and "is that source reliable enough to submit on?"

The experienced members had their go-to sources. The newer ones didn't, and asking mid-CTF burns time for everyone. What I wanted was one bot covering the reliable tools for the most common challenge types — so the question becomes "what do I know about this target?" instead of "where do I even start?"

That's **[Discord OSINT Assistant](https://github.com/gl0bal01/discord-osint-assistant)**. 31 slash commands across 8 categories, results in the channel where the whole team sees them. No divergent environments, no "which Python version do you have", no shared credentials in chat.

<!-- truncate -->

## 31 Commands Across 8 Categories

**Identity & Social**
```
/bob-sherlock    username search across 400+ platforms
/bob-maigret     deep username profiling
/bob-nuclei      username enumeration via Nuclei OSINT templates
/bob-linkook     link analysis
/bob-ghunt       Google account investigation
/bob-generate-usernames  500+ username variations from a name
```

**Domain & Network**
```
/bob-dns         DNS records lookup
/bob-whoxy       WHOIS history and reverse WHOIS
/bob-hostio      hosting intel
/bob-recon-web   web reconnaissance
/bob-redirect-chain  follow redirect chains
/bob-favicons    favicon hashing for infrastructure pivoting
```

**Image & Media**
```
/bob-exif        EXIF metadata with GPS mapping
/bob-rekognition AWS Rekognition facial analysis and object detection
```

**Blockchain**
```
/bob-blockchain        multi-chain address lookup (BTC/ETH/BSC/Polygon)
/bob-blockchain-detect auto-detect address format
```

**Transportation**
```
/bob-aviation     flight tracking
/bob-airport      airport data
/bob-flight-number flight history by number
/bob-vessels      maritime vessel intelligence
```

**Business & Identity**
```
/bob-pappers  French company registry (Pappers)
/bob-vpic     vehicle VIN lookup
/bob-nike     Nike Run Club profile search
```

**Analysis**
```
/bob-chat          AI chat (multi-model)
/bob-jwt           decode, tamper, and crack JWT tokens
/bob-xeuledoc      Google Docs metadata
/bob-extract-links extract all links from a page
/bob-dork          Google dorking
```

**Ops**
```
/bob-monitor  target monitoring with alerts
/bob-health   system health check
```

External CLI tools — Sherlock, Maigret, Nuclei, ExifTool, GHunt, xeuledoc, Linkook, jwt_tool — are optional. Commands that need a missing tool tell you what to install. Third-party API keys (Whoxy, Host.io, AviationStack, AWS) unlock additional commands, but none are required to start.

## A CTF Session

Maritime challenge: vessel name, you need the flag state and last known port. `/bob-vessels` with the name. Results in the channel, everybody sees it, someone immediately cross-references with the aviation challenge because they noticed the same port city.

That cross-reference happens because the data is shared. When one person runs a tool locally, that connection never gets made — you'd have to describe what you found, paste it, wait. In the channel it's just there, and the team reacts to it in real time.

Same for username enumeration. `/bob-sherlock username:target` fires Sherlock across 400+ platforms. While that's running, someone else hits `/bob-generate-usernames name:"First Last"` to get the variation list. Two people, one channel, no coordination overhead.

## v2.1.0: Security Hardening Pass

A bot that runs external tools on user-supplied input has an interesting attack surface. v2.1.0 is a full sweep of what happens when someone types something creative into a command field.

**Shell injection eliminated** — all external tools now run via `spawn()` with `shell: false` through `utils/process.js`. Arguments are passed as arrays, never interpolated into command strings. I audited every old shell-interpolation call after realizing a single quote in a username was enough to break out. Child processes get a stripped environment (PATH, HOME, LANG only — no API keys or tokens leak into subprocesses).

**SSRF protection** — `utils/ssrf.js` validates resolved IPs against private ranges at both DNS resolution and connect time via pinned HTTP agents. Blocks IPv4-mapped IPv6 bypasses. Redirect targets re-validated on each hop.

**Input validation** — `utils/validation.js` centralizes validation for usernames, domains, URLs, emails, and IPs. Strips shell metacharacters, null bytes, newlines, and Unicode fullwidth bypass characters before anything reaches an external tool.

**XSS prevention** — HTML reports (GHunt, Nike) now escape all user-controlled content via `escapeHtml()`.

**Permission gating** — Nuclei requires Administrator. Sherlock, Maigret, GHunt, JWT cracking, Rekognition, Monitor, Linkook, and xeuledoc require ManageGuild. Configurable via `OSINT_ALLOWED_ROLES`.

**Rate limiting** — per-user cooldowns at 3s (lightweight), 10s (medium), and 30s (heavy tools) with configurable daily limits.

**Guild whitelist** — set `ALLOWED_GUILD_IDS` to restrict which servers the bot operates in. Auto-leaves unauthorized servers on startup and when invited.

**Docker hardening** — `cap_drop: ALL`, read-only filesystem, non-root user, memory and PID limits, tmpfs mounts with size caps, health check.

**CI** — test matrix across Node 20/22, eslint, npm audit, Trivy image scanning, all Actions pinned to commit SHAs. 45 vitest tests covering validation, SSRF, process execution, and rate limiting.

## Breaking Changes in v2.1.0

- **Node.js ≥20 required**
- **Login monitoring removed** from `/bob-monitor` — the previous implementation stored plaintext credentials. Gone.
- **Sensitive commands now require ManageGuild** by default

## Quick Start

```bash
git clone https://github.com/gl0bal01/discord-osint-assistant.git
cd discord-osint-assistant
bun install
cp .env.example .env   # add DISCORD_TOKEN and CLIENT_ID at minimum
bun run deploy         # register slash commands
bun run start
```

Docker:

```bash
cp .env.example .env
docker compose up -d
```

---

If your team runs OSINT work or CTFs in Discord, this fits without adding a new tool to the stack — it lives where the conversation already happens. **[github.com/gl0bal01/discord-osint-assistant](https://github.com/gl0bal01/discord-osint-assistant)**
