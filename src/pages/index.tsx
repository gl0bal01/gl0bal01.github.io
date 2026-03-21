import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        {/* Cards Grid */}
        <div className={styles.cardGrid}>
          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📖</div>
              <h3>Intel Codex</h3>
            </div>
            <div className="card__body">
              <p>
                Complete operational manual for digital investigators and
                security analysts. Access field-tested SOPs, platform-specific
                guides, pentesting methodologies, malware analysis procedures,
                and real-world case studies.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/intel-codex"
              >
                Explore Intel Codex
              </Link>
            </div>
          </div>

          <div
            className={clsx("card", styles.categoryCard, styles.discordCard)}
          >
            <div className="card__header">
              <span
                className={clsx(styles.cardIcon, styles.discordIcon)}
              ></span>
              <h3>
                GlobalHub <span className={styles.gamingBadge}>🎮</span>
              </h3>
            </div>
            <div className="card__body">
              <p>
                Challenge yourself with 40+ interactive cybersecurity and OSINT
                exercises. Join this new community where learning meets gaming.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="https://discord.gg/T5tc9Rq8DV"
              >
                Join Discord Server
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📰</div>
              <h3>News & Blog</h3>
            </div>
            <div className="card__body">
              <p>
                Latest security news aggregated from trusted sources, plus
                personal insights on neurodiversity, psychology, and
                cybersecurity research.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--secondary button--block"
                to="/news"
              >
                Read News Feeds
              </Link>
              <Link
                className="button button--secondary button--block"
                to="/blog"
                style={{ marginTop: "0.5rem" }}
              >
                View Blog Posts
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🔬</div>
              <h3>Security Analysis SOPs</h3>
            </div>
            <div className="card__body">
              <p>
                Standard Operating Procedures (SOPs) for security analysis,
                reverse engineering, and cryptographic analysis.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/intel-codex/Security/Analysis/Analysis-Index"
              >
                View Analysis SOPs
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📚</div>
              <h3>Cheatsheets</h3>
            </div>
            <div className="card__body">
              <p>
                Quick reference guides, command sheets, and concise technical
                documentation for tools, frameworks, and methodologies.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/cheatsheets"
              >
                Browse Cheatsheets
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🔍</div>
              <h3>OSINT Foundations</h3>
            </div>
            <div className="card__body">
              <p>
                Theoretical frameworks, sockpuppet operations, strategic
                approaches, and fundamental concepts for open-source
                intelligence work.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/osint"
              >
                Explore OSINT
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🛡️</div>
              <h3>Cybersecurity</h3>
            </div>
            <div className="card__body">
              <p>
                Security best practices, threat intelligence, defensive
                strategies, and comprehensive guides for protecting digital
                assets.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/cyber"
              >
                View Security Guides
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>⚙️</div>
              <h3>Reverse Engineering</h3>
            </div>
            <div className="card__body">
              <p>
                Binary analysis, malware dissection, and reverse engineering
                techniques for uncovering hidden functionality in compiled code.
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/reverse-engineering"
              >
                Learn Reverse Engineering
              </Link>
            </div>
          </div>

          <div className={clsx("card", styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🤖</div>
              <h3>AI Resources</h3>
            </div>
            <div className="card__body">
              <p>
                Artificial intelligence security, machine learning
                vulnerabilities, AI-powered tools, and cutting-edge research in
                AI applications.
              </p>
            </div>
            <div className="card__footer">
              <Link className="button button--primary button--block" to="/ai">
                Explore AI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Security research, penetration testing and digital investigation techniques">
      <HomepageHeader />
      <main>
        <section className="container margin-vert--lg">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Heading as="h2">Open-Source Security Knowledge Base</Heading>
            <p>
              gl0bal01 is a free, open-source platform providing comprehensive resources for
              cybersecurity professionals, OSINT practitioners, and digital investigators. From
              penetration testing methodologies and malware analysis procedures to sockpuppet
              operations and network forensics, every guide is field-tested and community-driven.
            </p>
            <p>
              The <Link to="/intel-codex">Intel Codex</Link> serves as a complete operational
              manual with 70+ investigation guides, security analysis SOPs, and platform-specific
              techniques. All content is available as an{' '}
              <Link to="https://github.com/gl0bal01/intel-codex">Obsidian vault</Link> for
              offline use with full graph visualization.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
