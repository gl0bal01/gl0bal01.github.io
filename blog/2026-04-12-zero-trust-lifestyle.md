---
slug: zero-trust-lifestyle
title: "zero-trust-lifestyle: 33 Bash Scripts That Automate Everything You're Too Paranoid to Leave to Chance"
authors: gl0bal01
tags: [tools, productivity]
keywords: [zero trust lifestyle, bash scripts, opsec automation, security paranoia, productivity scripts, meeting automation, standup bot, wife happy score, sock maintenance, canary tokens, git secret scanner, cron automation]
description: "33 bash scripts covering OPSEC checks, meeting survival, git secret scanning, canary tokens, focus enforcement, and relationship reminders. The v1.0.0 release ships with critical security hardening — shell injection, weak crypto, and unsafe Chrome flags all fixed."
date: 2026-04-12
---

I forgot my anniversary twice in the same year. I committed AWS keys with GPS metadata still in the EXIF. I did Red Team work on Starbucks WiFi. I sent a 2am email to a CEO about "agile bullshit".

These are not hypothetical failure modes. These are the origin stories.

**[zero-trust-lifestyle](https://github.com/gl0bal01/zero-trust-lifestyle)** is what happens when a security researcher gets tired of being the threat model. 33 bash scripts, each one born from a real incident, covering everything from OPSEC paranoia to relationship maintenance to corporate survival. Someone found the scripts folder:

> *"So I'm going through my colleague's scripts folder. This security researcher has automated their entire life. You're not gonna believe this shit."*

Accurate.

<!-- truncate -->

## The Catalog

### OPSEC & Security

**`opsec-paranoia-check.sh`** — runs every 15 minutes. VPN status, webcam check, DNS leak detection, clipboard scanning, GPS metadata in recent files, microphone status, Tor running. The full suite. This one runs because of the AWS keys incident.

**`coffee-shop-lockdown.sh`** — detects public WiFi and immediately kills sensitive apps, enables VPN tunnel, blocks non-HTTPS traffic, clears clipboard, locks password manager. Giant red warning on screen. Origin: doing Red Team work on Starbucks WiFi. v1.0.0 fixed an AppleScript injection where attacker-controlled SSIDs were fed raw into `osascript` — so a WiFi network named `"; rm -rf ~; "` would have been a bad day.

**`git-secret-scanner.sh`** — pre-commit hook. Scans for AWS keys, GitHub tokens, private keys, passwords using regex and entropy checks. Shows a cost estimate of what you almost leaked. Origin: committing AWS keys with GPS metadata in the EXIF. You think it won't happen to you.

**`canary-token-generator.sh`** — generates email tracking pixels, PDF/Word canaries, DNS tokens, honeypot AWS credentials. Know exactly when, where, and from what IP someone opened your stuff.

**`delete-me-from-internet.sh`** — submits opt-out requests to 20+ data brokers (Spokeo, WhitePages, BeenVerified, and more). CCPA/GDPR email templates. Note: brokers re-aggregate from other sources — needs to be re-run periodically.

**`data-breach-stalker.sh`** — monitors your emails and domains across breach databases. HIBP integration, dark web paste monitoring.

### Corporate Survival

**`standup-bot.sh`** — generates standup updates from git commits at 9am. Translates "fixed bug" → "Resolved critical production system issue impacting user experience." Auto-posts to Slack. Honestly the most-used script in the collection.

**`passive-aggressive-emailer.sh`** — sentiment analysis on outgoing emails. Detects ALL CAPS, "per my last email", swearing, emails to executives at 2am. Configurable cooling-off period before sending. Origin: 2am email to CEO about "agile bullshit". The cooling-off period was the lesson.

**`meeting-excuse-generator.sh`** — auto-declines low-value meetings with professional excuses. Tracks time saved. "This week: 4.5 hours saved from declined meetings."

**`meeting-prep-assassin.sh`** — 5 minutes before meetings, auto-OSINTs everyone in your calendar. LinkedIn, GitHub, Twitter, recent blog posts. "Sarah just launched a side project, ask about it." You look prepared. You did nothing manually.

**`meeting-cost-calculator.sh`** — real-time meeting cost based on attendee salaries. Shows what the meeting costs in Starbucks coffees. Management tends to react to this one.

**`definitely-working.sh`** — simulates mouse activity to prevent idle status. Honest disclaimer included: corporate endpoint monitoring tools (CrowdStrike, Defender for Endpoint, Teramind) can distinguish software-generated input by inspecting event flags and timing patterns. May fool basic idle timers. May also violate your acceptable use policy. Use with awareness.

**`bullshit-jargon-translator.sh`** — translates "let's circle back and synergize on the deliverables" into what they actually mean.

### Focus & Productivity

**`focus-mode-nuclear.sh`** — 4 escalation levels from gentle website blocking to full system lockdown. Kills distracting apps, blocks social media at the hosts level, disables notifications. Cleanup traps ensure `/etc/hosts` and iptables are restored if the session is killed.

**`youtube-rabbit-hole-killer.sh`** — after 2 videos, blocks YouTube and shows "GO DO SOMETHING USEFUL". Daily reset at 4am.

**`random-skill-learner.sh`** — picks a random skill from 12 options (Rust, Docker, SQL, Vim, ML, Spanish...), blocks ALL distractions until you complete checkpoints. "You have 30 days. Twitter is blocked. Learn Rust or stay blocked."

### Personal Life

**`wife-happy-score.sh`** — scheduling aid and reminder tool for relationship dates: date nights, flower deliveries, upcoming anniversaries. What it outputs every morning:

```
REMINDER SUMMARY:
Days since flowers: 47
Days since date night: 23
Anniversary in: 3 days
SUGGESTION: Maybe plan something thoughtful? Here are some ideas.
```

Origin: forgetting the anniversary twice in the same year. Disclaimer is included and meant: *this is a reminder/tracking tool only, not a substitute for genuine emotional connection.* The script reminds you. The rest is on you.

**`sovereign-routine.sh`** — full daily routine automation: morning routine, habit management, journaling, energy levels. SQLite-backed with streaks.

**`expense-shame-dashboard.sh`** — import bank CSV, generate shame reports on coffee, subscriptions, and impulse buys converted to work hours.

## Themed Packs

Install everything or pick a pack:

```bash
git clone https://github.com/gl0bal01/zero-trust-lifestyle.git
cd zero-trust-lifestyle

./install.sh                          # everything
./install.sh --pack paranoid-dev      # OPSEC + secrets scanning + lockdown
./install.sh --pack corporate-survival # Slack + meetings + email + standup
./install.sh --pack osint-hunter      # research + sockpuppets + monitoring
./install.sh --pack deep-work         # focus protection + distraction killing
./install.sh --pack personal-life     # reminders + finances + health
./install.sh --script wife-happy-score # just one
```

## v1.0.0: Production Hardening

The April 12 release is a full security sweep. Which, yes, is slightly ironic for a security script collection.

**Critical fixes:**
- **Shell→Python injection** in `automated-sock-maintenance.sh` — unquoted bash interpolation in a Python heredoc let a username containing `"` execute arbitrary Python. Heredoc is now quoted; credentials travel through environment variables.
- **`source` of untrusted file** in `slack-auto-responder.sh` — the state file was `source`d as shell, giving any writer to `$DATA_DIR` shell execution. Replaced with validated JSON via `jq`.
- **Weak crypto** in `lib/common.sh` — `ENCRYPTION_PASSWORD` fallback to `/etc/machine-id` (world-readable, mode 0444) removed. Key now passed to `openssl` via `-pass fd:3` instead of `-pass pass:$password`, which was visible in `/proc/*/cmdline`. PBKDF2 iterations bumped to 200,000.

**High severity:**
- **AppleScript injection via WiFi SSID** in `coffee-shop-lockdown.sh` — SSIDs are attacker-controlled. Raw SSIDs were being fed into `osascript`. Sanitizer added.
- **`/tmp` symlink races** in `focus-mode-nuclear.sh` — PID files and hosts backup moved to `$DATA_DIR/.*` (mode 700, user-owned).
- **Unsafe Chrome flags removed** from `automated-sock-maintenance.sh` — `--no-sandbox`, `--disable-setuid-sandbox`, and `--disable-web-security` gone.
- **Cleanup traps** added so a killed session restores `/etc/hosts`, iptables, notifications, and wallpaper.

**Breaking change:** `ENCRYPTION_PASSWORD` is now required. Set it before upgrading:

```bash
echo "export ENCRYPTION_PASSWORD=\"$(openssl rand -base64 48)\"" >> config/config.sh
```

Back this up in a password manager. Losing it means losing access to `data/.secrets.enc`.

---

This is for people who recognize at least one incident in that list. The scripts are opinionated, occasionally unhinged, and tested against real failure modes. **[github.com/gl0bal01/zero-trust-lifestyle](https://github.com/gl0bal01/zero-trust-lifestyle)**
