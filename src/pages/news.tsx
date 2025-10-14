import React from 'react';
import Layout from '@theme/Layout';
import RSSDashboard from '@site/src/multi-rss-plugin/components/RSSDashboard';

export default function NewsPage(): JSX.Element {
  return (
    <Layout
      title="News Dashboard"
      description="Latest news from cybersecurity, AI, tech, and OSINT sources"
    >
      <main className="container margin-vert--lg">
        <div className="margin-bottom--lg">
          <h1>News Feeds</h1>
          <p>Latest updates</p>
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
