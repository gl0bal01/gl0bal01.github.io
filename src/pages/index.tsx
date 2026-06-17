import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

type IconProps = { className?: string };

const Icon = {
  Codex: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M9 7h7M9 11h5" />
    </svg>
  ),
  Discord: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  News: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M19 8h2v9a2 2 0 0 1-2 2" />
      <path d="M8 9h7M8 13h7M8 17h5" />
    </svg>
  ),
  Analysis: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  Cheatsheet: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  ),
  Osint: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  Shield: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Reverse: ({ className }: IconProps) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4h4v4H6zM14 4h4v4h-4zM6 16h4v4H6zM14 16h4v4h-4z" />
      <path d="M10 6h4M16 8v8M10 18h4M8 8v8" />
    </svg>
  ),
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>{siteConfig.tagline}</p>
        <ul className={styles.heroStats}>
          <li><strong>70+</strong> investigation guides</li>
          <li><strong>17+</strong> security RSS feeds</li>
        </ul>
      </div>
    </header>
  );
}

type CardProps = {
  icon: ReactNode;
  title: ReactNode;
  body: string;
  links: { to: string; label: string; variant?: "primary" | "secondary" }[];
  variant?: "default" | "featured" | "discord";
};

function CategoryCard({ icon, title, body, links, variant = "default" }: CardProps) {
  return (
    <article
      className={clsx(
        "card",
        styles.categoryCard,
        variant === "featured" && styles.featuredCard,
        variant === "discord" && styles.discordCard
      )}
    >
      <div className="card__header">
        <div className={styles.cardIcon}>{icon}</div>
        <h3>{title}</h3>
      </div>
      <div className="card__body">
        <p>{body}</p>
      </div>
      <div className="card__footer">
        {links.map((l, i) => (
          <Link
            key={l.to}
            className={clsx(
              "button",
              `button--${l.variant ?? "primary"}`,
              "button--block"
            )}
            to={l.to}
            style={i > 0 ? { marginTop: "0.5rem" } : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout description="Security research, penetration testing and digital investigation techniques">
      <HomepageHeader />
      <main className={styles.main}>
        <section className={clsx("container", styles.cardSection)}>
          <CategoryCard
            variant="featured"
            icon={<Icon.Codex className={styles.svgIcon} />}
            title="Intel Codex"
            body="Complete operational manual for digital investigators and security analysts. Field-tested SOPs, platform-specific guides, pentesting methodologies, malware analysis procedures, and real-world case studies. Available as an Obsidian vault for offline graph-based exploration."
            links={[
              { to: "/intel-codex", label: "Explore Intel Codex" },
              { to: "https://github.com/gl0bal01/intel-codex", label: "Get the Obsidian vault", variant: "secondary" },
            ]}
          />

          <div className={styles.cardGrid}>
            <CategoryCard
              icon={<Icon.Analysis className={styles.svgIcon} />}
              title="Security Analysis SOPs"
              body="Standard Operating Procedures for security analysis, reverse engineering, and cryptographic analysis."
              links={[{ to: "/intel-codex/Security/Analysis/Analysis-Index", label: "View Analysis SOPs" }]}
            />
            <CategoryCard
              icon={<Icon.Cheatsheet className={styles.svgIcon} />}
              title="Cheatsheets"
              body="Quick reference guides, command sheets, and concise technical documentation for tools, frameworks, and methodologies."
              links={[{ to: "/cheatsheets", label: "Browse Cheatsheets" }]}
            />
            <CategoryCard
              icon={<Icon.Osint className={styles.svgIcon} />}
              title="OSINT Foundations"
              body="Theoretical frameworks, sockpuppet operations, strategic approaches, and fundamental concepts for open-source intelligence work."
              links={[{ to: "/osint", label: "Explore OSINT" }]}
            />
            <CategoryCard
              icon={<Icon.Shield className={styles.svgIcon} />}
              title="Cybersecurity"
              body="Security best practices, threat intelligence, defensive strategies, and comprehensive guides for protecting digital assets."
              links={[{ to: "/cyber", label: "View Security Guides" }]}
            />
            <CategoryCard
              icon={<Icon.Reverse className={styles.svgIcon} />}
              title="Reverse Engineering"
              body="Binary analysis, malware dissection, and reverse engineering techniques for uncovering hidden functionality in compiled code."
              links={[{ to: "/reverse-engineering", label: "Learn Reverse Engineering" }]}
            />
            <CategoryCard
              icon={<Icon.News className={styles.svgIcon} />}
              title="News & Blog"
              body="Latest security news aggregated from trusted sources, plus personal insights on neurodiversity, psychology, and cybersecurity research."
              links={[
                { to: "/news", label: "Read News Feeds" },
                { to: "/blog", label: "View Blog Posts", variant: "secondary" },
              ]}
            />
            <CategoryCard
              variant="discord"
              icon={<Icon.Discord className={clsx(styles.svgIcon, styles.discordSvg)} />}
              title={<>GlobalHub <span className={styles.gamingBadge} aria-hidden="true">PLAY</span></>}
              body="40+ interactive cybersecurity and OSINT exercises. Join the community where learning meets gaming."
              links={[
                { to: "http://join.gl0bal01.com", label: "Join Discord Server" },
                { to: "https://youareplayer.com/", label: "Visit Arcade Platform", variant: "secondary" },
              ]}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
