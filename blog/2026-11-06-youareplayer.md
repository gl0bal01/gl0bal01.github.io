---
slug: youareplayer
title: "YouArePlayer: A Free CTF Arcade Where the Chatbot Stays Closed"
authors: gl0bal01
tags: [ctf, training, free]
keywords: [youareplayer, ctf practice, free ctf, ctf arcade, osint challenges, crypto challenges, ai evasion, prompt injection challenges, discord ctf, live ctf events]
description: "YouArePlayer is a free, community-built CTF arcade: 85 challenges across six worlds, from gentle warm-ups to stages that will make you work, plus live Discord events where every player gets their own flag."
date: 2026-11-06
---

In June 2025 I wrote a post about [running a CTF inside Discord](/blog/discord-judge-bot). The description said, and I quote myself, "No CTFd, no web frontend, no spreadsheet." I was proud of that line.

Seventeen months later, there's a web frontend. lol.

That's **[YouArePlayer](https://youareplayer.com)**. The judge bot is still in there, it just stopped being the whole thing.

<!-- truncate -->

## What it is

CTF challenges, free, played in the browser or in Discord. Right now that's 85 of them spread over six worlds:

| World | What's inside |
|---|---|
| Cyber | Web, networks, exploitation |
| OSINT | Recon, data, open source intelligence |
| Crypto | Ciphers, signatures, protocols |
| AI Evasion | Prompt injection, bypass, model exploitation |
| Mixed | Multi-category, combined skills |
| Fun | Light challenges, creative puzzles |

Difficulty goes from D1 to D4, and the gap between the two is real. D1 is where you get your first flag without a background. Some D4s will chew on you for a long time, hints or not.

## The scoring

Every challenge is worth 100 points times its difficulty:

| Difficulty | Multiplier | Clean solve |
|---|---|---|
| D1 | x1 | 100 |
| D2 | x1.2 | 120 |
| D3 | x1.5 | 150 |
| D4 | x2 | 200 |

Hints come off *before* the multiplier: 10 for the first, 15 for the second, 20 for the third, then 5 more for each one after that. The floor is 10 points, so a solve never scores zero. The third hint hurts, and that's the point: it's the moment you decide whether you want the points or the answer.

What it looks like in practice. You open a D3 OSINT stage. Twenty minutes in you're staring at the same three tabs, so you take hint 1. Still nothing. Hint 2. And boom, it clicks. That's `(100 - 10 - 15) x 1.5 = 113` instead of 150. You paid 37 points and got your evening back. Fair trade, honestly.

## Live events, and flags you can't share

Some games only exist for a day. They drop in Discord, they're time-limited, and every player gets their own version of the puzzle.

That last part is the bit I'm happiest with. In a live event your flag is generated for your account, so it's yours alone. Paste it in the chat and you've helped exactly nobody. It won't stop someone from explaining the method, but copy-pasting a flag is off the table.

## AI for research. Not to solve.

I know how this sounds in 2026, but the rule is simple. Search engines, maps, reverse image search, translators, decoders: all fine. Pasting the challenge into a chatbot: not fine. What you're here to learn is research, and a CTF you solve by forwarding it to a model is a captcha with extra steps.

The one exception is the AI Evasion world, where the model *is* the target. Prompt injection, bypasses, getting a model to do what it was told not to. There, talking to the AI is the whole job.

Same spirit for the rest of the rules: no flag sharing, no solve videos, no public writeups before a challenge retires, no automation. You can break them, sure. You'd be paying for a gym membership to watch someone else lift.

## Milestones and cards

There are 38 milestones across 9 families. Streak runs from 3 to 365 ("Warm-Up" to "Year of Fire"), First Blood from 1 to 100 ("First Blood" to "The Reaper"), and there are a few meaner ones like Purist and Giant Slayer.

Milestones mint numbered cards. The first serials are MYTHIC, the early wave is GOLD, everything after is STANDARD. Serial #1 goes to whoever got there first, forever. Yes, it's a little absurd. It also works on me, so I'm not judging.

The milestones worth putting on a CV also come with a credential someone can actually verify. That part deserves its own post, so it gets one next.

## Makers

Like the judge bot's Maker role, the arcade doesn't rely on me writing every stage. Makers go through Brief, Build, Review, Publish: write the description, set the flag, add attachments and hints, then submit for review before anyone plays it. If you'd rather build challenges than solve them, that's where to look.

---

It's for beginners chasing a first flag, and for people who want a D4 to stay stuck on for a while. It's still labeled beta, and 85 challenges is a shelf, not a library yet. If you find a broken stage, tell me on the [Discord](https://discord.gg/T5tc9Rq8DV), that's where the bug reports land.

**[youareplayer.com](https://youareplayer.com)**, free, and the details are on **[about.youareplayer.com](https://about.youareplayer.com)**.
