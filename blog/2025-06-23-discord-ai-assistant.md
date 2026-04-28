---
slug: discord-ai-assistant
title: "12 AI Models in Your Discord Server"
authors: gl0bal01
tags: [ai, tools, coding]
keywords: [discord ai bot, discord ai assistant, 1min.ai, gpt-4o discord, claude discord, deepseek discord, gemini discord, multi-model ai discord, ai slash command discord]
description: "A lightweight Discord bot that puts 12 AI models behind a single /ai slash command — GPT-4o, Claude Sonnet 4, Gemini, DeepSeek R1, Grok, Sonar, and more. One 1min.ai API key, no per-model credentials, persistent conversation context per user."
date: 2025-06-23
---

The team channel already had the rekognition bot for images. Someone asked if we could get AI in there too — not a link to ChatGPT, not "go use your own account", but actually in the channel where the conversation was happening. Results visible to everyone, model selection available to anyone, no one managing their own API keys.

That's **[Discord AI Assistant](https://github.com/gl0bal01/discord-ai-assistant)**. One `/ai` slash command, 12 models on a dropdown, routed through [1min.ai](https://1min.ai) so there's exactly one API key to manage. GPT-4o, Claude Sonnet 4, DeepSeek R1, Gemini, Grok, Sonar — whoever in the server needs a model, picks it from the list.

<!-- truncate -->

## Three Commands

```
/ai chat    conversational AI with persistent per-user, per-model context
/ai code    dedicated code generation mode with its own context window
/ai reset   clear conversation state (per model or all at once)
```

Each user maintains their own conversation history per model — so one person's DeepSeek R1 thread doesn't bleed into another's. Long responses come back as file attachments automatically, which matters when you're asking for a code review or a detailed analysis and Discord's message limit would otherwise truncate the answer.

## 12 Models, One Key

| Model | Type | Speed |
|-------|------|-------|
| GPT-4o Mini | General chat | Fast |
| GPT-4o | Complex reasoning | Medium |
| Claude Sonnet 4 | Advanced reasoning, code | Medium |
| Claude 3.7 Sonnet | Code, analysis | Medium |
| O3 Mini | Math, logic | Medium |
| O1 Mini | Reasoning | Medium |
| Gemini 1.5 Pro | Multimodal | Medium |
| DeepSeek Chat | General purpose | Medium |
| DeepSeek R1 | Chain-of-thought reasoning | Slow |
| Grok 2 | Creative, conversational | Medium |
| Sonar | Web-grounded search | Medium |
| Sonar Reasoning | Web-grounded + reasoning | Slow |

The 1min.ai API handles the routing. You get one key that covers everything — no separate OpenAI key, no separate Anthropic key, no Gemini credential. The tradeoff is you're going through 1min.ai's infrastructure rather than the model providers directly, which is worth knowing. For a team Discord channel it's the right call.

## A Real Session

CTF challenge, web category, unclear vulnerability class. `/ai chat` with Claude Sonnet 4 for the initial read — reasoning through the code. Switch to DeepSeek R1 for a second opinion, its chain-of-thought visible in the response. GPT-4o for a quick `/ai code` to prototype the payload. Three models, one channel, everyone following the reasoning thread.

The alternative: three browser tabs, three accounts, copy-pasting back and forth, results nobody else can see.

## Setup

```bash
git clone https://github.com/gl0bal01/discord-ai-assistant.git
cd discord-ai-assistant
bun install
cp .env.example .env
```

Fill in `.env`:

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_dev_server_id          # optional, for faster dev deploys
AI_TOKEN=your_1min_ai_api_key

# Optional
ALLOWED_GUILD_IDS=                   # comma-separated guild IDs to restrict access
RATE_LIMIT_MAX=10                    # max requests per user per window
RATE_LIMIT_WINDOW_MS=60000           # rate limit window in ms
```

Deploy and start:

```bash
bun run deploy    # register slash commands (instant on dev server)
bun start
```

Three dependencies. No framework. If you need global deployment instead of a single server, `bun run deploy:global` — takes up to an hour to propagate.

---

If your team is already in Discord and reaches for AI regularly, this removes the friction of switching context. **[github.com/gl0bal01/discord-ai-assistant](https://github.com/gl0bal01/discord-ai-assistant)**
