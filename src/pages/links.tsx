import { useEffect, useRef, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { usePluginData } from "@docusaurus/useGlobalData";

import styles from "./links.module.css";

type IconProps = { className?: string };

const Icon: Record<string, (p: IconProps) => ReactNode> = {
  github: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.04c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56A11.55 11.55 0 0 0 23.5 12.04C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  ),
  x: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  discord: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  startme: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </svg>
  ),
  notebook: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M12 8h4M12 12h4" />
    </svg>
  ),
  flag: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21V4" />
      <path d="M5 4h12l-2.5 4L17 12H5" />
    </svg>
  ),
  case: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  ),
  arcade: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4z" />
      <path d="M7 11v2M6 12h2" />
      <circle cx="16" cy="11.5" r=".6" fill="currentColor" />
      <circle cx="18" cy="13.5" r=".6" fill="currentColor" />
    </svg>
  ),
  blog: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h9l5 5v11H5z" />
      <path d="M14 4v5h5" />
      <path d="M8 13h7M8 17h5" />
    </svg>
  ),
  chevron: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
};

type LinkItem = {
  label: string;
  href: string;
  subtitle: string;
  icon: keyof typeof Icon;
  external?: boolean;
  tld?: string;
};

type PostItem = { title: string; description: string; permalink: string };
type SocialItem = { label: string; href: string; icon: keyof typeof Icon };

const PRIMARY: LinkItem[] = [
  { label: "Operator's Notebook", href: "/", subtitle: "Pentest playbooks, OSINT tradecraft, RE notes. Field-tested, opinionated, free.", icon: "notebook" },
  { label: "LeCodex", tld: ".xyz", href: "https://lecodex.xyz/", subtitle: "OSINT investigation techniques, security procedures, and case studies.", icon: "flag", external: true },
  { label: "CaseBandit", tld: ".com", href: "https://casebandit.com/", subtitle: "Capture evidence, map relationships, build timelines. Local-first, offline.", icon: "case", external: true },
  { label: "YouArePlayer", tld: ".com", href: "https://youareplayer.com/", subtitle: "50+ out-of-the-box games for fun and knowledge.", icon: "arcade", external: true },
];

const SOCIALS: SocialItem[] = [
  { label: "GitHub", href: "https://github.com/gl0bal01", icon: "github" },
  { label: "X / Twitter", href: "https://x.com/gl0bal01", icon: "x" },
  { label: "Discord", href: "https://discord.gg/T5tc9Rq8DV", icon: "discord" },
  { label: "start.me", href: "https://start.me/u/gl0bal01", icon: "startme" },
];

const BIO = "Researching signals, systems, and hostile patterns across OSINT, AI, and security.";

function LinkRow({ item, index }: { item: LinkItem; index: number }) {
  const Glyph = Icon[item.icon];
  const Chevron = Icon.chevron;
  const content = (
    <>
      <span className={styles.linkIcon} aria-hidden="true"><Glyph className={styles.glyph} /></span>
      <span className={styles.linkText}>
        <span className={styles.linkLabel}>
          {item.label}
          {item.tld && <span className={styles.tld}>{item.tld}</span>}
        </span>
        <span className={styles.linkSubtitle}>{item.subtitle}</span>
      </span>
      <Chevron className={styles.linkChevron} />
    </>
  );
  const style = { animationDelay: `${index * 60}ms` } as const;

  if (item.external) {
    return (
      <a className={styles.linkCard} style={style} href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link className={styles.linkCard} style={style} to={item.href}>
      {content}
    </Link>
  );
}

function PostRow({ post, index }: { post: PostItem; index: number }) {
  const Glyph = Icon.blog;
  const Chevron = Icon.chevron;
  return (
    <Link
      className={`${styles.linkCard} ${styles.latestCard}`}
      style={{ animationDelay: `${index * 60}ms` } as const}
      to={post.permalink}
    >
      <span className={styles.linkIcon} aria-hidden="true"><Glyph className={styles.glyph} /></span>
      <span className={styles.linkText}>
        <span className={styles.latestTitle}>{post.title}</span>
        {post.description && <span className={styles.latestDesc}>{post.description}</span>}
      </span>
      <Chevron className={styles.linkChevron} />
    </Link>
  );
}

export default function Links(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const avatar = useBaseUrl("/img/links/avatar.jpg");
  const avatarVideo = useBaseUrl("/img/links/avatar.webm");
  const banner = useBaseUrl("/img/links/banner.jpg");
  const ogImage = `${siteConfig.url}/img/links/banner.jpg`;
  const latestData = usePluginData("latest-posts-plugin") as { posts?: PostItem[] } | undefined;
  const latest = latestData?.posts ?? [];
  const avatarRef = useRef<HTMLVideoElement>(null);

  // Pause the looping avatar when the visitor prefers reduced motion (poster shows instead).
  useEffect(() => {
    const v = avatarRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
      } else {
        void v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <Layout
      title="gl0bal01 — Links"
      description={BIO}
      wrapperClassName={styles.linksWrapper}
      noFooter
    >
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.cosmos} aria-hidden="true">
        <div className={styles.warp} />
      </div>

      <main className={styles.shell}>
        <header className={styles.profile}>
          <div className={styles.banner}>
            <img className={styles.bannerImg} src={banner} alt="" loading="eager" decoding="async" width={1500} height={500} />
          </div>
          <video
            ref={avatarRef}
            className={styles.avatar}
            poster={avatar}
            width={120}
            height={120}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="gl0bal01 avatar"
          >
            <source src={avatarVideo} type="video/webm" />
          </video>
          <h1 className={styles.name}>gl0bal01</h1>
          <p className={styles.bio}>{BIO}</p>
        </header>

        <nav className={styles.links} aria-label="Profile links">
          {PRIMARY.map((item, i) => (
            <LinkRow key={item.href} item={item} index={i} />
          ))}
        </nav>

        {latest.length > 0 && (
          <>
            <div className={styles.sectionHead}>
              <span className={styles.sectionLabel}>Latest posts</span>
              <Link to="/blog" className={styles.sectionMore}>All posts →</Link>
            </div>
            <nav className={styles.links} aria-label="Latest blog posts">
              {latest.map((post, i) => (
                <PostRow key={post.permalink} post={post} index={PRIMARY.length + i} />
              ))}
            </nav>
          </>
        )}

        <ul className={styles.socials} aria-label="Social profiles">
          {SOCIALS.map((s) => {
            const Glyph = Icon[s.icon];
            return (
              <li key={s.href}>
                <a className={styles.socialBtn} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Glyph className={styles.socialGlyph} />
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.foot}>
          <Link to="/">← gl0bal01.com</Link>
        </p>
      </main>
    </Layout>
  );
}
