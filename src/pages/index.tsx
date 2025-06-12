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
        
        {/* Professional Card Grid */}
        <div className={styles.cardGrid}>
          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🤖</div>
              <h3>AI Security</h3>
            </div>
            <div className="card__body">
              <p>Explore cutting-edge research in artificial intelligence security, 
              machine learning vulnerabilities, and AI-powered attack detection.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/ai">
                Explore AI Research
              </Link>
            </div>
          </div>
          
          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🛡️</div>
              <h3>Cybersecurity</h3>
            </div>
            <div className="card__body">
              <p>Comprehensive penetration testing methodologies, vulnerability 
              assessments, and defensive security strategies.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/cyber">
                View Cyber Content
              </Link>
            </div>
          </div>
          
          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>🔍</div>
              <h3>OSINT</h3>
            </div>
            <div className="card__body">
              <p>Open Source Intelligence gathering techniques, digital investigation 
              methods, and information reconnaissance strategies.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary button--block"
                to="/osint">
                Discover OSINT
              </Link>
            </div>
          </div>
          
          <div className={clsx('card', styles.categoryCard)}>
            <div className="card__header">
              <div className={styles.cardIcon}>📝</div>
              <h3>Blog</h3>
            </div>
            <div className="card__body">
              <p>Exploring neurodiversity, human psychology, and the madness of mind—alongside cutting-edge research in cybersecurity, threat intelligence, and digital forensics.</p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--secondary button--block"
                to="/blog">
                Read Latest Posts
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
        <img
          src={require('@site/static/img/lama.jpg').default}
          alt="gl0bal01 Research Mascot"
          className={styles.mascotImage}
        />
      </main>
    </Layout>
  );
}