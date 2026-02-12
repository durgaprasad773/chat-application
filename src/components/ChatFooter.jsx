import React from 'react';

export function ChatFooter() {
  return (
    <div className="px-5 py-3 bg-white border-t border-gray-200">
      <div className="text-xs text-gray-600 font-medium text-center mb-1">
        Educational information only. Not a substitute for professional medical advice.
      </div>
      <div className="text-xs text-gray-500 text-center">
        Powered by{' '}
        <a
          href="https://www.neurascalex.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-700 font-semibold hover:underline"
        >
          NeurascaleX
        </a>
      </div>
    </div>
  );
}
