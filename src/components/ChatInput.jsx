import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';

export function ChatInput({
  disabled,
  onSendMessage,
  brandColour
}) {
  const [inputValue, setInputValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const textarea = e.target;
    setInputValue(textarea.value);

    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
  };

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-5 py-3 border-t border-gray-200 bg-white">
      <div className="flex gap-3 items-flex-end">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 max-h-24 overflow-y-auto bg-white"
          style={{
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            minHeight: '1.5rem'
          }}
          rows="1"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          style={{ backgroundColor: brandColour || '#667eea' }}
          className="flex-shrink-0 w-11 h-11 rounded-full text-white flex items-center justify-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send message"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
