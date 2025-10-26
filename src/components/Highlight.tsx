import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface HighlightProps {
  children: React.ReactNode;
  color?: string;
  block?: boolean;
}

export default function Highlight({ children, color = '#FFFF33', block = false }: HighlightProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '0.2rem',
        color: '#000', // always black text for readability on highlight
        padding: '0.2rem 0.4rem',
        display: block ? 'block' : 'inline',
        marginBottom: block ? '0.5rem' : 0,
      }}
      className="highlight-wrapper"
    >
      {children}
      <style>{`
        .highlight-wrapper a {
          color: #000 !important;
          text-decoration: underline;
          font-weight: 600;
        }
        .highlight-wrapper a:hover {
          color: #222 !important;
        }
      `}</style>
    </span>
  );
}
