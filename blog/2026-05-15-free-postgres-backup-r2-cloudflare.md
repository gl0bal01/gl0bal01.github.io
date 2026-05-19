---
title: "Free Encrypted Postgres Backups to Cloudflare R2"
description: "Set up automated, encrypted, off-site daily PostgreSQL backups to Cloudflare R2 within the free tier using a sidecar container, rclone, and client-side encryption."
slug: free-postgres-backup-r2-cloudflare
authors: [gl0bal01]
tags: [free, hosting, dev]
keywords: [postgres backup, cloudflare r2, rclone crypt, free object storage, docker backup, off-site backup, 3-2-1 backup, prodrigestivill]
hide_table_of_contents: false
date: 2026-05-15
---
import Highlight from '@site/src/components/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Free Encrypted Postgres Backups to Cloudflare R2

I've been dropping rclone into every new project since January. Once you watch encrypted dumps land in R2 in the time it takes to refill a coffee, every managed-backup-as-a-Service feels like paying rent on somebody else's wizard.

Latest one is `youareplayer.com` — small Postgres, single VPS, the kind of side project where one bad migration erases a weekend and the only insurance is the dump you forgot to run. Managed backups at $5–$20/month? Fine for a company, painful for a project paying its own server bill.

So: free, encrypted, off-site. **$0/month** if the database stays inside the R2 free tier. Here's the setup that's been running daily since.

<!-- truncate -->

:::note This guide combines a Docker sidecar (`prodrigestivill/postgres-backup-local`), Cloudflare R2 object storage, and `rclone` with client-side encryption to deliver a practical 3-2-1-style backup pattern with zero recurring storage cost when your retained backups fit inside the free tier.
:::

## Why Cloudflare R2 for Backups

<Highlight block>R2 is a strong fit for small backup restores because Standard storage includes a permanent monthly free tier and direct egress from R2 is free. You still pay for storage and operations beyond the included monthly usage.</Highlight>

### Small-Backup Cost Comparison

| Provider | Free Storage | Restore Egress | Free Tier Notes |
|----------|--------------|----------------|-----------------|
| **Cloudflare R2 Standard** | 10 GB-month/month | Free direct egress | Permanent monthly allowance; operations beyond allowance are billed |
| **Backblaze B2** | First 10 GB always free | Free up to 3x average monthly storage, then $0.01/GB | Permanent storage allowance; B2 is also a very good backup target |
| **AWS S3** | New-account free plan/credits | Common public egress rate is still about $0.09/GB after free data transfer allowances | Current AWS free tier is credit-based and time-limited for new accounts |
| **Google Cloud Storage** | 5 GB-month/month in eligible US regions | 100 GB/month from North America to most destinations | Always Free quotas are location-limited and subject to eligibility rules |
| **Azure Blob** | 5 GB LRS hot block blob | Azure free-account outbound allowance applies separately | Blob storage allowance is a 12-month new-account benefit |

<ins>**Why egress matters:**</ins>
- Backups go up cheaply on every provider.
- Restores pull data down; that is where egress pricing matters.
- A single full restore of 10 GB from a provider charging $0.09/GB costs about $0.90 in transfer fees. On R2, direct egress from Standard storage is $0.00.

### R2 Included Monthly Usage

| Item | Included Usage | Notes |
|------|----------------|-------|
| Class A operations (writes) | 1M/month | More than enough for daily uploads |
| Class B operations (reads) | 10M/month | Restores rarely touch this |
| Storage | 10 GB-month/month | Standard storage only |
| Direct egress | Free | No data transfer charge for direct R2 egress |

## Architecture Overview

<Highlight block>The pipeline has three independent layers, each replaceable without touching the others.</Highlight>

```
┌──────────────────────┐
│  Postgres container  │
└──────────┬───────────┘
           │ pg_dump (daily)
           ▼
┌──────────────────────┐
│  Backup sidecar      │  ← prodrigestivill/postgres-backup-local
│  (rotation, gzip)    │
└──────────┬───────────┘
           │ ./backups (host volume)
           ▼
┌──────────────────────┐
│  rclone crypt        │  ← client-side encryption
└──────────┬───────────┘
           │ HTTPS
           ▼
┌──────────────────────┐
│  Cloudflare R2       │  ← encrypted blobs only
└──────────────────────┘
```

### Why Three Layers

<ins>**Sidecar (local backups):**</ins>
- Native cron, gzip, multi-tier rotation (daily/weekly/monthly)
- Survives container restarts
- Restore-from-disk is instant when the VPS itself is healthy

<ins>**rclone crypt (encryption):**</ins>
- Filenames and contents encrypted before leaving the VPS
- A leaked R2 read token alone sees only ciphertext
- Standard cryptographic primitives (NaCl SecretBox/XSalsa20-Poly1305 + scrypt)
- Encryption protects confidentiality, not availability; a write-capable token can still delete objects

<ins>**R2 (off-site):**</ins>
- Survives full VPS loss
- Free tier covers typical project lifetimes
- S3 API means future migration is one config change

## Step 1: Backup Sidecar Container

Add to `docker-compose.prod.yml`:

```yaml
  db-backup:
    image: prodrigestivill/postgres-backup-local:16
    restart: unless-stopped
    depends_on: [postgres]
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_DB: gamesite
      POSTGRES_USER: gamesite_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_EXTRA_OPTS: "--clean --if-exists"
      SCHEDULE: "@daily"
      BACKUP_KEEP_DAYS: 7
      BACKUP_KEEP_WEEKS: 4
      BACKUP_KEEP_MONTHS: 6
      HEALTHCHECK_PORT: 8080
    volumes:
      - ./backups:/backups
    networks: [internal]
```

### Output Structure

```
backups/
├── last/     gamesite-20260515-013000.sql.gz
├── daily/    gamesite-20260515.sql.gz
├── weekly/   gamesite-202620.sql.gz
└── monthly/  gamesite-202605.sql.gz
```

Rotation is automatic: 7 daily, 4 weekly, 6 monthly = 17 historical points using a few hundred MB for typical small DBs.

### Restore Locally

```bash
gunzip -c backups/daily/gamesite-20260515.sql.gz | \
  docker exec -i gamesite-db psql -U gamesite_user -d gamesite
```

## Step 2: Create the R2 Bucket and Token

### Create the Bucket

1. Sign in to `dash.cloudflare.com`
2. **R2 Object Storage** → **Create bucket**
3. Name: `gamesite-backups`
4. Location: leave **None** selected for automatic placement, or choose a location hint if you know where restores will usually run

### Create an API Token

<Highlight block>Use **Account API Tokens** rather than User API Tokens — Account tokens survive if you leave an organization, which matters for production cron jobs.</Highlight>

1. **R2** → **Manage R2 API Tokens** → **Create Account API Token**
2. Token name: `gamesite-backup`
3. Permissions: **Object Read & Write**
4. Scope: **Apply to specific buckets** → `gamesite-backups`
5. TTL: forever
6. Create and immediately copy:
   - `Access Key ID`
   - `Secret Access Key`
   - S3 endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`

The secret is shown exactly once. Lose it = recreate the token.

## Step 3: Install and Configure rclone

```bash
curl https://rclone.org/install.sh | sudo bash
rclone version
```

### Configure the Raw R2 Remote

```bash
rclone config
```

| Prompt | Answer |
|--------|--------|
| New remote | `n` |
| Name | `r2` |
| Storage | `s3` |
| Provider | `Cloudflare` |
| `env_auth` | `false` |
| `access_key_id` | *(paste from R2 token)* |
| `secret_access_key` | *(paste from R2 token)* |
| Region | `auto` |
| Endpoint | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` |
| Edit advanced config | `y` |
| `no_check_bucket` | `true` |
| Confirm | `y` |

<Highlight block>Set <code>no_check_bucket = true</code> — without it, rclone tries <code>CreateBucket</code> on every upload, which a bucket-scoped token cannot do, producing a confusing 403 AccessDenied.</Highlight>

### Verify

```bash
rclone lsf r2:gamesite-backups     # should not 403
```

## Step 4: Add Client-Side Encryption

Without encryption, any leaked read-capable R2 token can read every backup. The fix is `rclone crypt`, a client-side encryption layer that wraps the raw remote.

### Create the Crypt Remote

```bash
rclone config
```

| Prompt | Answer |
|--------|--------|
| New remote | `n` |
| Name | `r2crypt` |
| Storage | `crypt` |
| Remote | `r2:gamesite-backups/encrypted` |
| `filename_encryption` | `standard` |
| `directory_name_encryption` | `true` |
| Password | `g` → `1024` → **save the generated string** |
| Password2 (salt) | `g` → `1024` → **save the generated string** |
| Edit advanced config | `n` |
| Confirm | `y` |

<Highlight block>Save the generated crypt passphrases and the rclone config file (<code>~/.config/rclone/rclone.conf</code>) to a password manager BEFORE running a single backup. If you lose the crypt credentials/config entirely, the encrypted backups are permanently unrecoverable.</Highlight>

### Two Remotes, One Pipeline

| Remote | Purpose | Used By |
|--------|---------|---------|
| `r2:` | Raw S3 access to R2 | Required base — do not delete |
| `r2crypt:` | Encrypted layer over `r2:gamesite-backups/encrypted` | All backup writes/reads |

The crypt remote is a virtual layer. Writing to `r2crypt:foo.gz` produces a file at `r2:gamesite-backups/encrypted/<garbled>` whose name and contents are encrypted client-side.

### Verification

```bash
echo "test" > /tmp/t.txt
rclone copy /tmp/t.txt r2crypt:
rclone ls r2crypt:                              # shows "t.txt"
rclone ls r2:gamesite-backups/encrypted         # shows random ciphertext name
rclone deletefile r2crypt:t.txt
```

## Step 5: Schedule the Off-Site Sync

Edit the host crontab:

```bash
crontab -e
```

```cron
30 1 * * * /usr/bin/rclone sync /home/dev/projects/game-site/backups r2crypt: --transfers=4 --log-file=/var/log/r2-backup.log
```

With `SCHEDULE=@daily`, the sidecar runs once per day. The `01:30` sync gives a buffer for small databases, but set the sync time later if your dumps can run longer.

### Sync vs Copy

| Command | Behavior | When to Use |
|---------|----------|-------------|
| `rclone sync` | Mirrors source — deletes remote files missing locally | Default for rotation-aware backups |
| `rclone copy` | Adds and updates only, never deletes | Use when you want remote to keep history beyond local rotation |

The sidecar already rotates; `sync` keeps R2 aligned.

### What This Looks Like Running

Three weeks in, this is the boring success path:

- 01:00 — sidecar dumps the day's DB and gzips it.
- 01:30 — cron fires `rclone sync`, ships the diff to R2 over HTTPS.
- 01:30 + a handful of seconds — log file gets one line, nothing else cares.

You only notice a stack like this when you don't have it. The first time something goes sideways and `rclone copy r2crypt:daily/...` puts your DB back twenty seconds later — that's when free-tier suddenly feels like a lottery you didn't enter.

## Step 6: Test Restore End-to-End

<Highlight block>Backups are theatre until the restore is proven. Run this once now, not "someday".</Highlight>

```bash
# Pull latest encrypted dump
rclone copy r2crypt:daily/gamesite-20260515.sql.gz /tmp/

# Sanity-check it decompresses
gunzip -c /tmp/gamesite-20260515.sql.gz | head -50

# Restore to a throwaway database
docker exec gamesite-db createdb -U gamesite_user gamesite_restore_test
gunzip -c /tmp/gamesite-20260515.sql.gz | \
  docker exec -i gamesite-db psql -U gamesite_user -d gamesite_restore_test

# Compare row counts to production
docker exec gamesite-db psql -U gamesite_user -d gamesite -c '\dt' > /tmp/prod.txt
docker exec gamesite-db psql -U gamesite_user -d gamesite_restore_test -c '\dt' > /tmp/restore.txt
diff /tmp/prod.txt /tmp/restore.txt
```

## Operational Costs at Realistic Scales

Assumes daily compressed Postgres dumps at typical compression ratios (~10x).

| Raw DB Size | Compressed Daily | 6 Months Retained | Monthly R2 Cost |
|-------------|------------------|-------------------|-----------------|
| 100 MB | ~10 MB | ~170 MB | $0 (free tier) |
| 1 GB | ~100 MB | ~1.7 GB | $0 (free tier) |
| 5 GB | ~500 MB | ~8.5 GB | $0 (free tier) |
| 10 GB | ~1 GB | ~17 GB | ~$0.10 |
| 50 GB | ~5 GB | ~85 GB | ~$1.10 |

R2 Standard storage past the free tier is $0.015/GB-month. Direct egress is not billed by the GB, though normal Class B request counts still apply.

## When to Use This (and When Not To)

Use this if you're on a single Postgres VPS or small cluster, your retained compressed backups fit the R2 free tier, you want client-side encryption with no vendor lock-in, and $0/month beats managed convenience.

Skip it if you need point-in-time recovery to the second, your compliance auditor wants vendor-attested backup procedures, your operational time costs more than the service fee, or your DB is large enough that R2's free tier is irrelevant. AWS RDS automated backups and Supabase PITR exist for a reason — if someone else pays the bill, they're fine. For a VPS you're paying for yourself, the math goes the other way fast.

## Hardening Checklist

- [ ] Passphrases and `rclone.conf` stored in a password manager
- [ ] At least one successful end-to-end restore test
- [ ] Cron log monitored (`/var/log/r2-backup.log`) or piped to alerting
- [ ] Cloudflare API token scoped to one bucket, not account-wide
- [ ] Sidecar `BACKUP_KEEP_*` matches your actual recovery requirements
- [ ] Second offline copy of `rclone.conf` (USB, encrypted attachment)

Free-tier, encrypted, off-site, tested — the four together are rare. With this in place, a complete VPS loss is a one-hour rebuild.

What's missing: point-in-time recovery (daily granularity only), failure alerting when a sync dies silently (cron's quiet success is a feature until it isn't), cross-region durability beyond R2's own. For a side project paying its own bills, this is the floor below which you're hoping. Set it once, test the restore, get on with the actual code.

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Cloudflare R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare R2 API Tokens](https://developers.cloudflare.com/r2/api/tokens/)
- [Cloudflare R2 Data Location](https://developers.cloudflare.com/r2/reference/data-location/)
- [rclone S3 Cloudflare R2 Configuration](https://rclone.org/s3/#cloudflare-r2)
- [rclone crypt Documentation](https://rclone.org/crypt/)
- [prodrigestivill/postgres-backup-local](https://github.com/prodrigestivill/docker-postgres-backup-local)
- [3-2-1 Backup Strategy (US-CERT)](https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf)
- [Postgres pg_dump Reference](https://www.postgresql.org/docs/current/app-pgdump.html)

---
