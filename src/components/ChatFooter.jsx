import React from 'react';

export function ChatFooter() {
  return (
    <div
      className="text-center"
      style={{ padding: '0 14px 14px', color: '#4f6474', fontSize: 12, lineHeight: 1.45, background: '#fff' }}
    >
      Educational information only · Not a substitute for professional medical advice, diagnosis, treatment, medication advice or crisis support · Powered by{' '}
      <a
        href="https://www.neurascalex.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#075a85', fontWeight: 700, textDecoration: 'none' }}
      >
        NeuraScaleX
      </a>
    </div>
  );
}
