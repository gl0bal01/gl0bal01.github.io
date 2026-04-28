---
slug: discord-amazon-rekognition
title: "AWS Rekognition in Your Discord Server"
authors: gl0bal01
tags: [osint, tools, coding]
keywords: [discord bot, aws rekognition, face comparison, ocr discord, celebrity recognition, image analysis discord, osint discord, content moderation, face detection bot]
description: "A Discord bot that wires AWS Rekognition into slash commands — face comparison, OCR, object detection, celebrity recognition, content moderation. One command, answer visible to everyone."
date: 2025-06-23
---

I'm old and slow. Not elderly — just, by the time I've got five tabs open, uploaded to a face tool, waited for the result, and figured out what the confidence score actually means, the moment's gone. The CTF clock is ticking and my teammates are staring at me.

What I actually wanted was `/rekognition compare` in the team channel. One command, answer visible to everyone, no browser tabs, no copy-pasting face URLs into some website that charges per lookup. Just: does this face match that face, yes or no, confidence score attached.

That's the whole idea. **[discord-amazon-rekognition](https://github.com/gl0bal01/discord-amazon-rekognition)** wires AWS Rekognition's full analysis pipeline into two Discord slash commands. Face comparison, OCR, object detection, celebrity recognition, content moderation — all available without leaving the channel where the conversation is actually happening.

<!-- truncate -->

## Two Commands

### `/rekognition analyze`

Runs one or all of five analysis features against a URL or uploaded image:

| Feature | What it returns |
|---------|----------------|
| Labels & Objects | Thousands of detected objects, scenes, and concepts with confidence scores |
| Text Detection (OCR) | Extracted text with per-word confidence and bounding box data |
| Face Analysis | Age range, emotions, facial attributes, pose, quality |
| Celebrity Recognition | Named celebrities with match confidence and IMDb links |
| Content Moderation | Explicit/suggestive/violent content categories with confidence |

Results come back as a rich embed with a JSON report attached for when you need to dig deeper. The "All Features" option runs everything at once — useful when you don't know what you're looking for yet.

### `/rekognition compare`

Face comparison between two images. Configurable similarity threshold, default 80%.

```
/rekognition compare source_image:[photo1] target_image:[photo2] similarity:75
```

Returns match confidence, whether the threshold was met, and the count of other faces detected in the target. That last one matters — if a photo has seven people in it, you want to know the comparison found the right one.

## A Real Session

Someone drops a blurry event photo in the CTF channel. Challenge: identify the conference and the speaker. Old way: download image, reverse image search manually, squint at alt text, maybe find a name.

With the bot: `/rekognition analyze url:[photo]` with All Features enabled. Labels come back with "conference", "presentation", "stage". OCR pulls partial text from a banner in the background — enough to Google the event. Celebrity Recognition identifies the speaker outright with 94% confidence and an IMDb link.

Total time: about eight seconds. The JSON attachment has the bounding box coordinates and raw confidence scores if you need to document it properly.

## Setup

```bash
git clone https://github.com/gl0bal01/discord-amazon-rekognition.git
cd discord-amazon-rekognition
bun install
cp .env.example .env
```

Fill in `.env` with your Discord bot token, client ID, and AWS credentials. The IAM policy is narrow on purpose — six Rekognition actions, nothing else:

```json
{
  "Effect": "Allow",
  "Action": [
    "rekognition:DetectLabels",
    "rekognition:DetectText",
    "rekognition:DetectFaces",
    "rekognition:DetectModerationLabels",
    "rekognition:RecognizeCelebrities",
    "rekognition:CompareFaces"
  ],
  "Resource": "*"
}
```

Deploy commands and start:

```bash
bun run deploy    # instant deployment to your test server
bun run start
```

For production, the Docker image runs with a read-only filesystem, non-root user, tini init, pinned base image, and a tmpfs mount for temp files:

```bash
docker run -d \
  --name rekognition-bot \
  --read-only \
  --tmpfs /app/temp:rw,noexec,nosuid,size=100m \
  --memory=512m --cpus=1.0 --pids-limit=50 \
  --security-opt=no-new-privileges:true \
  --env-file .env --restart unless-stopped \
  rekognition-bot
```

## Security

Most Discord bots that fetch user-supplied URLs skip SSRF entirely. This one doesn't, because I thought about what happens when someone in the channel types a URL that resolves to `169.254.169.254`. Not great.

- **SSRF protection** — DNS resolution with private IP blocking across IPv4, IPv6, IPv4-mapped IPv6, 6to4, and Teredo ranges. Pinned HTTP agents prevent DNS rebinding.
- **Magic bytes validation** — file signatures verified (JPEG, PNG, GIF, BMP, WebP) before anything reaches Rekognition. Renaming a PHP file to `.jpg` doesn't work.
- **Path traversal prevention** — random filenames with extension allowlisting; no user-controlled path components.
- **Rate limiting** — per-user cooldown plus global concurrency cap.
- **Error sanitization** — internal errors are never surfaced to Discord users.
- **No image retention** — temp files deleted 10 seconds after each request. Nothing is logged.


## AWS Free Tier

AWS Rekognition includes 5,000 images/month free for the first 12 months. Standard pricing after that is $1–5 per 1,000 images depending on the feature. For a team CTF channel or occasional OSINT workflow, the free tier covers essentially everything. Worth knowing before you assume this is expensive.

---

If your team is already in Discord and does anything involving images — OSINT, CTF, content review — it fits the workflow without adding another tool to the stack. Check it out: **[github.com/gl0bal01/discord-amazon-rekognition](https://github.com/gl0bal01/discord-amazon-rekognition)**
