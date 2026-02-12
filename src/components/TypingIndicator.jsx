import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center">
      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </div>
  );
}
