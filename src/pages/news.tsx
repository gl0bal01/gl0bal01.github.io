import React from 'react';
import Layout from '@theme/Layout';
import RSSDashboard from '@site/src/multi-rss-plugin/components/RSSDashboard';

export default function NewsPage(): JSX.Element {
  return (
    <Layout
      title="News Dashboard"
      description="Latest news from cybersecurity, AI, tech, and OSINT sources"
    >
      <main className="container margin-vert--lg" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="margin-bottom--lg">
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>News Feeds</h1>
          <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>Stay ahead with the freshest insights in AI, cybersecurity, OSINT, and tech research.</p>
        </div>
        <RSSDashboard
          maxItems={50}
          showStats={true}
          enableFiltering={true}
        />
      </main>
    </Layout>
  );
}
