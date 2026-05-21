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
          color: inputValue ? '#213244' : '#a7b3be',
          padding: '0 14px',
          border: '1px solid #dce8ee',
          background: '#fff',
          borderRadius: 13,
          fontSize: 13,
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
          borderRadius: 13,
          background: '#e4f4f5',
          color: '#1f5f64',
          fontSize: 20,
          fontWeight: 900,
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
