import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function Highlight({ children, color = '#FFFF33', block = false }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '0.2rem',
        color: isDark ? '#000' : '#000', // force black text for readability
        padding: '0.2rem 0.4rem',
        display: block ? 'block' : 'inline',
        marginBottom: block ? '0.5rem' : 0,
      }}
    >
      {children}
    </span>
  );
}
