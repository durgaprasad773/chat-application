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
    <div className="p-2.5 px-3 border-t border-[#E2E8F0] flex gap-2 items-center bg-white">
      <input 
        ref={inputRef}
        placeholder="Type your question..." 
        className="flex-1 text-sm px-3 py-2 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] focus:outline-none focus:border-[#005B9A] focus:text-[#0F172A]"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button 
        className="w-[38px] h-[38px] rounded-[10px] bg-[#E2E8F0] flex items-center justify-center flex-shrink-0 hover:bg-[#CBD5E1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSend}
        disabled={!inputValue.trim() || disabled}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14 8L2 2l2 6-2 6 12-6z" fill="#94A3B8"/>
        </svg>
      </button>
    </div>
  );
}
