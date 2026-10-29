import React, { useRef, useState } from 'react';

export function ChatInput({
  disabled,
  onSendMessage,
  brandColour
}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 44px',
        gap: 8,
        margin: '14px 18px 18px',
      }}
    >
      <input
        ref={inputRef}
        placeholder="Type your question..."
        style={{
          height: 43,
          display: 'flex',
          alignItems: 'center',
          color: inputValue ? '#13293a' : '#6b7c8a',
          padding: '0 14px',
          border: '1px solid #e3e9ee',
          background: '#fff',
          borderRadius: 12,
          fontSize: 16,
          outline: 'none',
          width: '100%',
        }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button
        style={{
          border: 0,
          borderRadius: 12,
          background: '#e9f27d',
          color: '#05405f',
          fontSize: 20,
          fontWeight: 700,
          cursor: disabled || !inputValue.trim() ? 'not-allowed' : 'pointer',
          opacity: disabled || !inputValue.trim() ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleSend}
        disabled={!inputValue.trim() || disabled}
        aria-label="Send"
      >
        ↑
      </button>
    </div>
  );
}
