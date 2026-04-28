---
slug: wp-quick-dev
title: "WordPress Dev Environment in 60 Seconds"
authors: gl0bal01
tags: [tools, coding]
keywords: [wordpress development, docker wordpress, wp-cli, wordpress local environment, plugin development, theme development, mailpit, phpmyadmin, wp quick dev]
description: "A Docker-based WordPress development environment for rapid plugin and theme prototyping. One setup script, a Makefile for everything, per-plugin git repos, built-in Mailpit and phpMyAdmin. Not for production."
date: 2025-10-28
---

The client message arrives at 10pm. "Can you have a plugin POC ready by morning?" Sure. And then you spend the next 45 minutes getting your local PHP to match the right version, untangling why WP-CLI can't find your config, tracking down why email testing isn't working, and fixing permissions that WordPress keeps silently breaking.

The plugin itself takes 40 minutes. The environment setup takes longer. That's backwards.

After enough "by morning" requests across hundreds of plugins and dozens of themes, I stopped tolerating the setup tax. **[WP Quick Dev](https://github.com/gl0bal01/wp-quick-dev)** — one script, `make install`, done. WordPress 6.0+ on PHP 8.2, MariaDB 11.0, WP-CLI, phpMyAdmin, and Mailpit, all up and running in under 60 seconds. Then the actual work starts.

<!-- truncate -->

## The Stack

- WordPress 6.0+ on PHP 8.2 (configurable to 8.1–8.4)
- MariaDB 11.0
- WP-CLI in its own container
- phpMyAdmin at `:8081`
- Mailpit (email testing) at `:8025`

## Setup

```bash
curl -O https://raw.githubusercontent.com/gl0bal01/wp-quick-dev/main/setup.sh
chmod +x setup.sh
./setup.sh my-project
cd my-project
make up
make install
```

WordPress is at `http://localhost:8080`. That's it. No PHP version juggling, no SMTP configuration, no manual database setup.

## The Makefile Workflow

Everything runs through `make`. The commands you'll actually use:

```bash
make up / make down / make restart   # environment lifecycle
make health                          # check all services are running
make logs                            # tail all container logs
make logs service=wordpress          # tail one service
make shell                           # bash into the WordPress container
make wp cmd="plugin list"            # run any WP-CLI command
make fix-permissions                 # fix www-data ownership
make backup                          # timestamped gzip'd DB dump to backups/
make clean                           # ⚠ wipe everything
```

`make fix-permissions` deserves a mention — WordPress file ownership breaks constantly when you're editing files from the host. One command instead of googling the `chown` incantation again.

## Plugin and Theme Development

Each plugin or theme lives in `plugins/` or `themes/` and syncs directly into the container via volume mount. Each one can be its own git repository, which means your plugin ships from here straight to GitHub:

```bash
# Create and version a new plugin
make plugin name=my-feature
make plugin-repo name=my-feature
cd plugins/my-feature
git remote add origin https://github.com/username/my-feature.git
git push -u origin main

# Or clone an existing one
make plugin-clone repo=https://github.com/username/existing-plugin.git
```

Same pattern for themes with `make theme` and `make theme-repo`. You edit files locally, WordPress sees the changes immediately — no sync step, no deploy step.

## Working with Existing Sites

The most practical workflow: a client sends a production dump and you need to poke around locally.

```bash
# Import a production dump
make db-import file=/path/to/production.sql.gz

# Fix URLs to match local environment
make sr old=https://client-site.com new=http://localhost:8080
```

If the import activates a theme whose files aren't present locally, you'll get a blank screen. Fix it with:

```bash
make wp cmd="theme activate twentytwentyfour"
```

## Email Testing

Mailpit captures all outgoing WordPress mail. Open `http://localhost:8025` — every email the site sends appears there, no real inboxes involved. Registration emails, WooCommerce order confirmations, password resets — you can test the whole flow without touching SMTP config.

## A Real Session

Client sends a dump at 11pm: "Can you reproduce this checkout bug?" Import the database, fix URLs, switch to a default theme because theirs isn't local. Ten minutes. Reproduce the bug in another five. Write the fix, test against the local site, email catches the order confirmation. Done by midnight.

The old version of this: install XAMPP, fight PHP version, wonder why MySQL won't start, give up and use Local by Flywheel, discover Local is doing something weird with the import. Midnight becomes 2am.

## Not for Production

The environment trades security for convenience — explicitly:

- File permissions: 0777 across `wp-content`
- Default database credentials
- WP debug mode enabled
- File editing allowed in the admin

This is intentional. It's a prototyping environment, not a server config. The warning is in the README title. Don't copy this to a live server.

---

If you do WordPress dev with any regularity, the time it saves on first setup pays for itself the first time a client says "by morning." Check it out: **[github.com/gl0bal01/wp-quick-dev](https://github.com/gl0bal01/wp-quick-dev)**
