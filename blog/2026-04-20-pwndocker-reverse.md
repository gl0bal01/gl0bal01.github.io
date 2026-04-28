---
slug: pwndocker-reverse
title: "pwndocker-reverse: One Docker Image for CTF Pwn and Reverse Engineering"
authors: gl0bal01
tags: [tools, reverse-engineering]
keywords: [pwndocker, ctf, reverse engineering, ghidra, ida free, binary ninja, pwntools, gdb plugins, pwndbg, gef, peda, afl++, frida, docker ctf environment]
description: "A single Dockerfile with 45+ pwn and reverse-engineering tools — 7 disassemblers, 3 GDB plugins with instant switching, AFL++, frida, and a pre-populated command history. Rebuilt weekly and signed with cosign."
date: 2026-04-20
---

CTF weekend. My teammate can't run my exploit because their Ubuntu isn't my Ubuntu. Different Python version, different libc, different vibes. The tool that works on my machine installs cleanly on mine and fails silently on theirs. We burn 40 minutes on environment debugging instead of the actual challenge.

The "works on my machine" problem, but for offsec tooling. The fix is obvious in hindsight: package everything into one image so the next teammate just does `docker pull`.

**[pwndocker-reverse](https://github.com/gl0bal01/pwndocker-reverse)** is that image — 45+ tools on Ubuntu 24.04, everything from pwntools to Ghidra to AFL++ to three GDB plugins that coexist without breaking each other. One pull, you're in.

<!-- truncate -->

## What's Inside

| Category | Tools |
|----------|-------|
| **Exploit Dev** | pwntools, angr, ROPgadget, ropper, one_gadget, seccomp-tools, qiling, pwninit |
| **Disassemblers / Decompilers** | Ghidra, IDA Free, Binary Ninja Free, Cutter, radare2, rizin, retdec, pycdc, jd-gui |
| **GDB Plugins** | pwndbg, GEF, PEDA — with switcher scripts |
| **Dynamic Analysis** | frida, strace, ltrace, villoc (heap visualizer) |
| **Fuzzing** | AFL++ |
| **Hex Editors** | ImHex, hexedit |
| **Workflow** | libc-database, patchelf, binwalk, unblob, upx |
| **Analysis** | binary-refinery, opengrep, hash-identifier |
| **Networking** | socat, ncat, tcpdump, tshark, nmap |
| **Emulation** | QEMU user-mode, gdb-multiarch |
| **Libraries** | capstone, keystone, unicorn, z3, yara, r2pipe |

Seven disassemblers. Three GDB plugins that actually coexist. AFL++. Frida. Everything you'd otherwise spend an afternoon installing, fighting Java versions for Ghidra, getting pwndbg and GEF to stop overwriting each other's `.gdbinit`. That's already done.

## Quick Start

```bash
docker pull ghcr.io/gl0bal01/pwndocker-reverse:latest
docker run -it --rm --cap-add=SYS_PTRACE -v $(pwd):/ctf ghcr.io/gl0bal01/pwndocker-reverse
```

You land in `/ctf` as user `ctf` (sudo available), with oh-my-zsh and 97 pre-loaded history entries. Hit `Ctrl+R` and start typing — the syntax for every installed tool is already in your history. No man page spelunking mid-CTF.

If your host UID isn't 1000:

```bash
docker build --build-arg CTF_UID=$(id -u) --build-arg CTF_GID=$(id -g) -t pwndocker-reverse .
```

## GDB Plugin Switching

All three major plugins coexist without conflict. Switch per-session or set a default:

```bash
gdb-pwndbg ./binary    # launch with pwndbg
gdb-gef ./binary       # launch with GEF
gdb-peda ./binary      # launch with PEDA
gdb-switch pwndbg      # set default for plain `gdb`
```

If you've ever tried to install all three manually and had them fight over `.gdbinit`, you know what this solves.

## GUI Tools

Ghidra, IDA Free, Binary Ninja Free, Cutter, and jd-gui all work via X11 forwarding. On Linux this is native; macOS needs XQuartz, Windows needs VcXsrv or WSLg.

```bash
docker run -it --rm --cap-add=SYS_PTRACE \
  -e DISPLAY=$DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v $(pwd):/ctf ghcr.io/gl0bal01/pwndocker-reverse

# Inside the container
ghidra
ida64 ./binary
binaryninja ./binary
start-cutter.sh ./binary
```

IDA Free and Binary Ninja Free are installed from vendor free-tier downloads — compliance with each vendor's license is your responsibility.

## Typical CTF Workflow

```bash
# Recon
checksec --file=./challenge && file ./challenge && strings -n 8 ./challenge

# Gadgets
ROPgadget --binary ./challenge --ropchain
ropper --file ./challenge --search "pop rdi"
one_gadget ./libc.so.6

# Patch binary to use provided libc
pwninit --bin ./challenge --libc ./libc.so.6
patchelf --set-interpreter ./ld-linux-x86-64.so.2 --set-rpath . ./challenge

# Exploit
python3 exploit.py
```

For dynamic hooking:

```bash
frida -f ./binary -l script.js
frida-trace -f ./binary -i "malloc"
strace -f ./binary
ltrace ./binary
villoc /tmp/ltrace.out > heap.html   # heap layout visualization
```

## Reproducibility

The image rebuilds every Monday. Three ways to consume it depending on how much reproducibility matters:

```bash
# Rolling — always fresh, not reproducible
docker pull ghcr.io/gl0bal01/pwndocker-reverse:latest

# Dated weekly snapshot — frozen but recent
docker pull ghcr.io/gl0bal01/pwndocker-reverse:weekly-20260406

# Digest — fully reproducible, pin this in team setups
docker pull ghcr.io/gl0bal01/pwndocker-reverse@sha256:<digest>
```

Every image is signed with [cosign](https://github.com/sigstore/cosign) (keyless, GitHub OIDC) and ships with an SBOM and SLSA provenance attestation:

```bash
cosign verify ghcr.io/gl0bal01/pwndocker-reverse:latest \
  --certificate-identity-regexp 'https://github.com/gl0bal01/pwndocker-reverse/.*' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

---

For CTF teams or anyone who's lost time to environment inconsistencies instead of the actual challenge. `docker pull`, mount your working directory, start working. **[github.com/gl0bal01/pwndocker-reverse](https://github.com/gl0bal01/pwndocker-reverse)**
