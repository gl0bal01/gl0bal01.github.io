---
slug: volatility-toolkit
title: "Volatility Toolkit v2: Automated Memory Forensics for Windows, Linux, and macOS"
authors: gl0bal01
tags: [tools, reverse-engineering]
keywords: [volatility 3, memory forensics, dfir, volatility toolkit, memory analysis automation, ioc extraction, malfind, linux rootkit detection, macos memory forensics, windows memory forensics]
description: "Automated Volatility 3 wrapper for Windows, Linux, and macOS memory dumps. Auto-detects OS, runs 30/21/20 plugins in parallel, extracts IOCs, generates structured reports with chain-of-custody checksums. v2.1.0 adds symlink rejection, binary validation, and a 31-test unit suite."
date: 2026-04-12
---

Forensics challenge, 90-minute timer. I spent 60 of those minutes running `vol -f memory.raw <plugin>` in sequence, one plugin at a time, piping output to files, checking for errors, moving to the next. Mechanical, repetitive work. And at the end of it I had 25 output files to correlate — and I'd never gotten to `malfind`. The artifact was in there. I missed it because I ran out of time doing the wrong kind of thinking.

That's the problem: Volatility 3 is powerful, but the interface is 20+ manual commands on every single case. **[Volatility Toolkit](https://github.com/gl0bal01/volatility-toolkit)** automates the sequence. Auto-detect the OS, run all relevant plugins in parallel, extract IOCs, structured report. One command. Then you think about what the dump shows, not which command to type next.

<!-- truncate -->

## What It Does

```bash
vol-analyze memory.raw                              # auto-detect, run everything
vol-analyze memory.raw --os windows \
    -o case-001/ -j 8 \
    --dump-files --dump-registry --extract-strings --json
```

The script:
1. Auto-detects whether the dump is Windows, Linux, or macOS
2. Computes MD5 + SHA256 for chain of custody before touching anything
3. Runs all relevant plugins in parallel batches (`-j N`, default 4)
4. Separates stdout from stderr — errors go to `.err` files, never mixed into plugin output
5. Shows per-plugin timing and success/failure status
6. Generates a text summary and optional JSON report

## Plugin Coverage

| OS | Plugins | Highlights |
|----|---------|------------|
| **Windows** | 30 | Processes, DLLs, network, registry, services, `malfind`, kernel drivers, SSDT hooks |
| **Linux** | 21 | Processes, bash history, kernel modules, network, rootkit checks (syscall/IDT/credentials) |
| **macOS** | 20 | Processes, kexts, network, TrustedBSD, kauth listeners, syscall/sysctl checks |

Windows dumps work out of the box — symbols are bundled with Volatility 3. Linux and macOS require matching kernel symbols installed first.

The parallel execution is the part that matters most. 30 plugins at `-j 8` means you're reading the first results while the rest are still running. The case I described above takes about eight minutes instead of sixty.

## IOC Extraction

`--extract-strings` runs after plugin execution and categorizes strings into separate files:

```
strings/
├── all.txt            raw strings
├── ipv4.txt           IPv4 addresses
├── urls.txt           URLs
├── domains.txt        domain names (sorted by frequency)
├── emails.txt         email addresses
└── windows_paths.txt  / unix_paths.txt
```

The frequency-sorted domains file is the one you want first. Whatever's communicating most often floats to the top.

## Output Structure

```
case-001/
├── pslist.txt / pstree.txt
├── netscan.txt / sockstat.txt
├── malfind.txt
├── *.err                      per-plugin error logs
├── strings/                   (with --extract-strings)
├── dump_files/                (Windows --dump-files)
├── registry_dump/             (Windows --dump-registry)
├── analysis_summary.txt
└── analysis_summary.json      (with --json)
```

## Documentation

Five practical guides included — workflow context, not just command references:

- **[Windows Cheatsheet](https://github.com/gl0bal01/volatility-toolkit/blob/main/docs/vol3-cheatsheet.md)** — 30 plugins with workflow context
- **[Linux Cheatsheet](https://github.com/gl0bal01/volatility-toolkit/blob/main/docs/linux-cheatsheet.md)** — 21 plugins including rootkit detection
- **[macOS Cheatsheet](https://github.com/gl0bal01/volatility-toolkit/blob/main/docs/mac-cheatsheet.md)** — 20 plugins including TrustedBSD and kauth
- **[Malware Analysis Guide](https://github.com/gl0bal01/volatility-toolkit/blob/main/docs/vol3-malware-analysis.md)** — hunting malware in memory
- **[Investigation Methodology](https://github.com/gl0bal01/volatility-toolkit/blob/main/docs/investigation-methodology.md)** — structured DFIR workflow

## v2.1.0: Hardening and Test Suite

The April 12 update tightened input handling and added a proper test harness:

**Security hardening:**
- Symlink rejection on input dump path
- `VOL3_CMD` binary validation before execution — prevents path injection via the environment variable
- Expanded system directory blocklist for output paths
- Output directory created with `chmod 700`
- Empty `OUTPUT_DIR` guard (prevents writing to `/`)
- `json_escape` improved with `\r`/`\b`/`\f` handling and `jq` preference when available

**Test suite:**
- 31-test unit suite via `make test`
- CI test job added alongside the existing ShellCheck lint job
- All GitHub Actions pinned to commit SHAs

## Install

```bash
git clone https://github.com/gl0bal01/volatility-toolkit.git
cd volatility-toolkit
sudo make install        # installs vol-analyze system-wide + tab completions
```

Or run directly without installing:

```bash
./scripts/vol-analyze.sh memory.raw
```

Requires Volatility 3 (`vol` in PATH), Bash 4.0+, and standard Unix tools (`strings`, `md5sum`, `sha256sum`).

---

For anyone doing DFIR work or forensics CTFs who is still running plugins one at a time — this is the upgrade. **[github.com/gl0bal01/volatility-toolkit](https://github.com/gl0bal01/volatility-toolkit)**

Licensed AGPL-3.0. Commercial dual-license available.
