import React from 'react';
import Layout from '@theme/Layout';
import RSSDashboard from '@site/src/multi-rss-plugin/components/RSSDashboard';

export default function OSINTFeedsPage(): JSX.Element {
  return (
    <Layout
      title="OSINT Feeds"
      description="Latest OSINT and investigation news"
    >
      <main className="container margin-vert--lg">
        <div className="margin-bottom--lg">
          <h1>OSINT News Feeds</h1>
          <p>Latest updates from open source intelligence and digital investigation sources.</p>
        </div>
        <RSSDashboard
          maxItems={30}
          showStats={true}
          enableFiltering={true}
          defaultCategory="osint"
        />
      </main>
    </Layout>
  );
}
