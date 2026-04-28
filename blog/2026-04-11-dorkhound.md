---
slug: dorkhound
title: "dorkhound: 340+ OSINT Dorks for Missing Person Investigations and TraceLabs CTFs"
authors: gl0bal01
tags: [osint, tools]
keywords: [dorkhound, google dorks, osint, tracelabs, missing persons, ctf, reverse image search, nuclei, dork generator, investigation toolkit]
description: "dorkhound generates 340+ ranked OSINT search URLs across 25 categories from a name, email, phone, or username. Single Go binary, local dashboard, TraceLabs export. Built for missing-person investigations and TraceLabs CTF competitions."
date: 2026-04-11
---

My first TraceLabs CTF. The clock is running, my teammates are already triaging leads, and I'm still typing `site:linkedin.com "John Doe" Seattle` by hand. The same query I've typed a hundred times. Then the username variants. Then the reverse image search URLs for each platform, one by one. We finished 7th, which is fine, but it didn't feel like 7th-place work — it felt like I'd spent a third of the competition on mechanical tasks that shouldn't take that long.

I went home and started building **[dorkhound](https://github.com/gl0bal01/dorkhound)**. Give it a name — or a full case file with emails, phones, usernames, a photo — and it generates 340+ ranked search URLs across 25 categories, ready to triage. The scaffolding that used to take 45 minutes takes about three seconds.

<!-- truncate -->

## What It Does

```bash
# Simplest form
dorkhound --name "Jane Doe"

# Full case from YAML
dorkhound --case case.yaml --dashboard

# TraceLabs submission
dorkhound --case case.yaml --export tracelabs -o submission.md
```

Every identifier you provide multiplies the corpus. A name alone generates a useful baseline. Add a username and the output expands significantly across platform-specific categories. Add a photo URL and you get reverse image search links for every major platform automatically.

## 25 Categories, 340+ Dorks

v1.1.0 expanded from 6 categories at launch to 25:

`social` · `records` · `financial` · `location` · `forums` · `people-db` · `email` · `phone` · `username` · `cache` · `documents` · `dating` · `marketplace` · `image` · `gravatar` · `github` · `academic` · `direct-profile` · `twitter` · `reddit` · `fundraiser` · `telegram` · `vehicle` · `crypto` · `nuclei`

A few worth calling out:

**twitter** — every Twitter dork emits `site:twitter.com OR site:x.com` plus nitter mirrors, Wayback Machine captures of both domains, the X syndication endpoint, and X advanced-search URLs for login-less reconnaissance.

**reddit** — `old.reddit.com` alongside `reddit.com`, RSS feeds, `about.json` profile endpoints, and third-party search indexers.

**direct-profile** — no search engine involved. Direct-URL dorks for 20+ platforms: Telegram, Keybase, Twitter/X, Mastodon, Bluesky, GitHub, Reddit, Steam, Twitch, Last.fm, SoundCloud, Medium, Dev.to, Dribbble, Flickr, About.me, Linktree, and more.

**image** — reverse image search across Google Lens, Yandex (best for faces), TinEye, Bing Visual Search, PimEyes, SauceNAO, IQDB, and KarmaDecay. Pass `--photo-url` to activate.

**github** — commits-by-email search, `.keys`/`.gpg` leak probes, public-events API, gists.

## TraceLabs Workflow

The tool is built specifically for the TraceLabs CTF format:

1. Copy `examples/tracelabs.yaml`, fill in name, age, location, photo URL
2. `dorkhound --case case.yaml --dashboard` — local web UI opens
3. Triage with the filter bar — start with `image`, `username`, `direct-profile` for the high-signal pass
4. Add notes and evidence per result (persisted in localStorage between sessions)
5. As you find new handles or emails, add them to `case.yaml` and re-run — each new identifier expands the corpus
6. `--export tracelabs -o submission.md` produces a checklist formatted for flag submission

That last step matters. In my first CTF I was copy-pasting evidence into a document by hand at the end. With the export, the submission draft is already structured by the time the clock runs out.

## Dashboard

The `--dashboard` flag serves a local web UI with:
- Filter bar to focus by category
- Per-result notes and evidence fields, persisted in localStorage
- Rate-limited "Open batch" (default 10 per 30s) to avoid search-engine CAPTCHAs
- Keyboard shortcuts: `/` filter, `j`/`k` navigate, `x` mark reviewed, `d` open URL, `n` edit note

## Preflight and Nuclei

**`--preflight`** HEAD-probes every direct-URL dork and drops dead links before output. Saves you from opening 40 tabs to find that half the people-database links are 404. Search-engine-wrapped dorks pass through untouched. Configurable concurrency, timeout, and per-worker cooldown.

**`--nuclei`** runs nuclei OSINT templates against each username across 600+ sites and appends results under the `nuclei` category. Requires the nuclei binary:

```bash
go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
nuclei -update-templates
dorkhound --name "Jane Doe" --usernames "jdoe42" --nuclei
```

## Install

```bash
# go install
go install github.com/gl0bal01/dorkhound/cmd/dorkhound@latest

# or grab a pre-built binary (Linux, macOS, Windows)
# https://github.com/gl0bal01/dorkhound/releases
```

Requires Go 1.25+ for source builds. Pre-built binaries have zero runtime dependencies — single binary, drop it on the machine and go.

---

Built for TraceLabs CTFs and missing-person investigations. If you're doing either of those and still constructing dorks by hand, this is the fix. **[github.com/gl0bal01/dorkhound](https://github.com/gl0bal01/dorkhound)**

> Intended for authorized OSINT investigations, CTF competitions, and educational use only.
