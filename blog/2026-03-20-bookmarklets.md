---
slug: bookmarklets
title: "9 OSINT Bookmarklets: No Install, No Permissions, All Local"
authors: gl0bal01
tags: [osint, tools]
keywords: [osint bookmarklets, javascript bookmarklets, linkedin osint, domain osint, website recon, username generator, vessel tracker, ctf tools, browser osint, hidden content extractor]
description: "9 JavaScript bookmarklets for OSINT, security research, and CTF — LinkedIn data extraction, domain recon, website path scanning, username generation, vessel tracking, and more. v2.0.0 adds the Website Recon Scanner."
date: 2026-03-20
---

Mid-CTF, web challenge, something is hidden on the page. I'm digging through source by hand, looking for HTML comments and concealed tags, squinting at DevTools like a man who lost his glasses. Ten minutes of this. Worst ten minutes of my life.

That became the first bookmarklet — Expose Hidden Content. One click, color-coded highlights, done in two seconds. The rest accreted from the same place: every "ugh, this again" moment during a CTF or OSINT investigation that was repeatable enough to automate. Username generation from a name. Bulk URL opening from a dork result. Domain reconnaissance without opening 30 tabs manually. Each one is a muscle memory shortcut that stopped being manual.

That's **[bookmarklets](https://github.com/gl0bal01/bookmarklets)** — 9 tools built on one principle: drag a link to your bookmark bar, click it on any page, done. No install, no extension permissions, no trust in a third party. The entire source is visible JavaScript that runs locally in your browser. Nothing leaves the page.

<!-- truncate -->

## The 9 Tools

**Expose Hidden Content** — reveals HTML comments, hidden elements, and content concealed via CSS with color-coded highlighting. The one that started all of this. A quick first pass on any page during web CTF challenges or security research — what you see isn't always what's there.

**Domain OSINT Hub** — opens 30+ OSINT services for any domain in one click: Shodan, VirusTotal, URLScan, Wayback, certificate transparency logs, DNS lookups, and more. One click, a lot of tabs, but you have the full picture. Preset system for saving common workflows.

**LinkedIn OSINT Extractor** — extracts posts, comments, timestamps, and engagement metrics from the current LinkedIn page. Exports as TXT, JSON, HTML, or CSV. Useful for archiving profiles or mapping activity timelines without touching third-party scrapers.

**URLs Extractor** — pulls every link and resource from the current page into a searchable HTML report plus a plain TXT file. Handles Base64-encoded content. Useful for mapping all outbound connections or finding obfuscated URLs buried in the page.

**Enhanced Image Downloader** — batch downloads images from the current page with size filtering and auto-scrolling to trigger lazy-loaded content. Generates a metadata file alongside the download.

**Username Generator** — takes a real name and produces 500+ username variations: abbreviations, separators, l33t, platform-specific patterns. Copy the list and feed it into Sherlock, Maigret, or any username enumeration tool. You know the routine.

**Multi-URL Opener** — paste a list of URLs into a prompt, open them all at once. Handles smart protocol detection and corrects missing `https://` prefixes. Useful for bulk-opening results from a dork or a list of profile URLs you've collected.

**Website Recon Scanner** *(new in v2.0.0)* — scans 80+ paths for sensitive files, well-known URIs, API endpoints, and development artifacts. Audits security headers with critical/non-critical classification. Detects 50+ technologies (frameworks, CMS, analytics, CDNs). Also extracts cookies, social links, contacts, and external resources. Dark-themed UI with a progress bar, stop button, and export to TXT, JSON, or HTML.

**Vessel Tracker** — generates tracking links across maritime platforms (MarineTraffic, VesselFinder, FleetMon, and others) from an IMO number, MMSI, or vessel name. Maritime challenges have a specific flavor of suffering — "find the ship" takes 30 seconds with this instead of manually constructing URLs for each platform.

## A Quick Session

Web app, OSINT challenge, you have a domain and a name. 

Expose Hidden Content first — check if anything's in the source you're not seeing. Domain OSINT Hub on the domain — Shodan, certs, Wayback all in one shot. Username Generator on the name — 500 variations, paste into Sherlock. Website Recon Scanner for the API surface and security headers.

That's four bookmarklets, one tab, five minutes. Each one a task that used to be manual.

## v2.0.0

The March 2026 release adds the Website Recon Scanner — the most substantial new tool, covering path scanning, tech detection, and header auditing in one place. Also ships a documentation overhaul: restructured README, new CONTRIBUTING.md and CHANGELOG.md, all 9 bookmarklets in the interactive installer, fixed broken links. The Domain OSINT Hub grew from 18 to 30+ services.

## Install

The [interactive installer](https://htmlpreview.github.io/?https://github.com/gl0bal01/bookmarklets/blob/main/install.html) lists all 9 as drag-and-drop buttons. Or copy the minified `.js` source from any bookmarklet folder and save it as a bookmark URL manually. That's it — no package manager, no config file, no setup.

---

These are for people who find themselves doing the same browser tasks by hand repeatedly. If that's not you, carry on. If it is — **[github.com/gl0bal01/bookmarklets](https://github.com/gl0bal01/bookmarklets)**
