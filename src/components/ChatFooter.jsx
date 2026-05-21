import React from 'react';

export function ChatFooter() {
  return (
    <div
      className="text-center"
      style={{ padding: '0 14px 14px', color: '#7e8d9d', fontSize: 10.5, lineHeight: 1.45, background: '#f5fafb' }}
    >
      Educational information only · Not a substitute for professional medical advice, diagnosis, treatment, medication advice or crisis support · Powered by{' '}
      <a
        href="https://www.neurascalex.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#1f5f64', fontWeight: 700, textDecoration: 'none' }}
      >
        NeuraScaleX
      </a>
    </div>
  );
}
