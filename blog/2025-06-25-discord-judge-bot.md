---
slug: discord-judge-bot
title: "Running a CTF Inside Discord"
authors: gl0bal01
tags: [tools, coding]
keywords: [discord judge bot, ctf discord bot, discord challenges, badgr badges, digital credentials discord, discord ctf platform, challenge bot discord, leaderboard bot, hint system discord]
description: "A Discord bot that turns your server into a CTF platform — challenges, hints, leaderboards, and automatic Badgr badge issuance. No CTFd, no web frontend, no spreadsheet."
date: 2025-06-25
---

CTFd is genuinely good software. It's also a whole thing to deploy, and the managed hosting costs money, and the free tier has limits, and now you're maintaining infrastructure for an event that runs once a quarter for thirty people who are already in your Discord server.

The "pin the challenges in a channel, DM me your answers" approach works exactly once before someone complains about fairness, someone else asks for a hint publicly, and the leaderboard becomes a spreadsheet you're updating by hand at midnight. Life is too short.

So I built the platform inside the place where everyone already was. **[Discord Judge Bot](https://github.com/gl0bal01/discord-judge-bot)** — challenge creation, submissions, hints, leaderboards, and digital badge issuance, all in slash commands.

<!-- truncate -->

## How It Works

Three command groups cover the full lifecycle:

### Players
```
/judge-register   link your email to receive Badgr digital badges
/judge-games      browse challenges — paginated, sortable by difficulty
/judge-hint       request a hint (costs points)
/judge-submit     submit an answer
/judge-progress   view your solved challenges and current score
/judge-leaderboard global rankings
```

### Makers (role-gated)
```
/maker create     create a new challenge
/maker edit       edit your challenges
/maker remove     remove a challenge
/maker list       list all challenges you've created
```

### Admins
```
/judge-admin reset         reset user progress
/judge-admin stats         game statistics
/judge-admin manage-hints  adjust user hint counts
/judge-admin user-stats    detailed per-user analytics
```

The Maker role is the detail that makes this usable for a team. You don't want everyone creating challenges — just the people you've designated. Role-gate it, hand out the Maker role, and challenge authors manage their own content without needing admin access.

## Challenges as YAML

Challenges live in `config/games/` as plain YAML files. Version them in git, diff them before events, review them without touching the bot:

```yaml
challenge_id:
  name: "Challenge Name"
  description: "Challenge description"
  author: "Creator Name"
  answer: "correct answer"
  difficulty: 2
  reward_type: "badgr"
  hints:
    - "First hint"
    - "Second hint"
  approved: true
```

The `approved` flag lets you queue challenges for review before they go live. Useful when multiple people are contributing content and you want a second pair of eyes before players see it. `/maker create` writes this same structure — direct file editing or the command both work.

## Hint System

Hints cost points. Base penalty is configurable (`hint_base_penalty: 10` in `bot.yaml`), players start with a budget (`starting_points: 100`). That's the standard CTF tradeoff — take the hint and lose points, or spend time and keep them. Configurable because some communities want light penalties and some want brutal ones.

## Digital Badges via Badgr

On correct submission the bot calls the [Badgr](https://badgr.com/) API and issues a digital credential to the player's registered email. Verifiable, shareable badge — players actually care about these more than you'd expect. Organizers don't touch anything manually.

Badgr is optional. If `BADGR_TOKEN` isn't set, the bot works fine without it. Run the whole thing with no external dependencies if you want to keep it simple.

## A Real Session

Community CTF, eight challenges, twenty participants. Everyone's already in the server. 

Someone runs `/judge-games` — sees the list sorted by difficulty, picks the first one. Tries an answer with `/judge-submit`, wrong. Debates spending points on a hint for ninety seconds, then does it. Gets the second hint, solves it. Bot DMs them a badge link. Their name appears on `/judge-leaderboard` immediately.

Meanwhile the challenge author — Maker role, not admin — notices their hardest challenge has a typo in the description. Fixes it with `/maker edit` without touching anything else. 

No spreadsheet. No DMs to sort through. The admin spent the event watching `/judge-admin stats` instead of updating a Google sheet.

## Setup

```bash
git clone https://github.com/gl0bal01/discord-judge-bot.git
cd discord-judge-bot/judge-bot
npm install
cp .env.example .env   # add DISCORD_TOKEN, CLIENT_ID, optional BADGR_TOKEN
npm run deploy         # register slash commands
npm start
```

Minimal `.env`:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
GUILD_ID=your_server_id
```

Badgr credentials are optional — add `BADGR_BASE_URL` and `BADGR_TOKEN` to enable automatic badge issuance.

---

If your community runs any kind of challenge event and is already on Discord, the overhead here is genuinely low. No server to provision, no web frontend to maintain. Check it out: **[github.com/gl0bal01/discord-judge-bot](https://github.com/gl0bal01/discord-judge-bot)**
