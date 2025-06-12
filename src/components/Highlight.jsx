// src/components/Highlight.jsx
import React from 'react';

export default function Highlight({ children, color = '#FFFF33', block = false }) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '0.2rem',
        color: 'var(--ifm-font-color-base)',
        padding: '0.2rem 0.4rem',
        display: block ? 'block' : 'inline',
        marginBottom: block ? '0.8rem' : 0,
      }}
    >
      {children}
    </span>
  );
}
