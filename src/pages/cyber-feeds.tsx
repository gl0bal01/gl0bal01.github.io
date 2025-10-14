import React from 'react';
import Layout from '@theme/Layout';
import RSSDashboard from '@site/src/multi-rss-plugin/components/RSSDashboard';

export default function CyberFeedsPage(): JSX.Element {
  return (
    <Layout
      title="Cybersecurity Feeds"
      description="Latest cybersecurity news and updates"
    >
      <main className="container margin-vert--lg">
        <div className="margin-bottom--lg">
          <h1>Cybersecurity News Feeds</h1>
          <p>Latest updates from top cybersecurity sources including Krebs on Security, Schneier on Security, Dark Reading, and more.</p>
        </div>
        <RSSDashboard
          maxItems={40}
          showStats={true}
          enableFiltering={true}
          defaultCategory="cyber"
        />
      </main>
    </Layout>
  );
}
