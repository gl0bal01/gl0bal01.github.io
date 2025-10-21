import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        {/* Cards Grid */}
        <div className={styles.cardGrid}>
          <div className={clsx('card', styles.categoryCard, styles.featuredCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📖</div>
              <h3>Intel Codex</h3>
            </div>
            <div className="card__body">
              <p>Complete operational manual for digital investigators and security analysts.
              Access field-tested SOPs, platform-specific guides, pentesting methodologies,
              malware analysis procedures, and real-world case studies.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/intel-codex">
                Explore Intel Codex
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🔍</div>
              <h3>OSINT Foundations</h3>
            </div>
            <div className="card__body">
              <p>Theoretical frameworks, sockpuppet operations, strategic approaches, and fundamental concepts for open-source intelligence work.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/osint">
                Explore OSINT
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🛡️</div>
              <h3>Cybersecurity</h3>
            </div>
            <div className="card__body">
              <p>Security best practices, threat intelligence, defensive strategies, and comprehensive guides for protecting digital assets.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/cyber">
                View Security Guides
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>⚙️</div>
              <h3>Reverse Engineering</h3>
            </div>
            <div className="card__body">
              <p>Binary analysis, malware dissection, and reverse engineering techniques for uncovering hidden functionality in compiled code.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/reverse-engineering">
                Learn Reverse Engineering
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🤖</div>
              <h3>AI Resources</h3>
            </div>
            <div className="card__body">
              <p>Artificial intelligence security, machine learning vulnerabilities, AI-powered tools, and cutting-edge research in AI applications.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/ai">
                Explore AI
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📚</div>
              <h3>Cheatsheets</h3>
            </div>
            <div className="card__body">
              <p>Quick reference guides, command sheets, and concise technical documentation for tools, frameworks, and methodologies.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/cheatsheets">
                Browse Cheatsheets
              </Link>
            </div>
          </div>

          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📰</div>
              <h3>News & Blog</h3>
            </div>
            <div className="card__body">
              <p>Latest security news aggregated from trusted sources, plus personal insights on neurodiversity, psychology, and cybersecurity research.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--secondary button--block"
                to="/news">
                Read News Feeds
              </Link>
              <Link
                className="button button--secondary button--block"
                to="/blog"
                style={{marginTop: '0.5rem'}}>
                View Blog Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="Security research, penetration testing and digital investigation techniques">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}