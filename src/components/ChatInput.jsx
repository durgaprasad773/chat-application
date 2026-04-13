import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="bg-white p-4 border-t border-slate-100">
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Input 
            ref={inputRef}
            placeholder="Type your question..." 
            className="rounded-full bg-slate-50 border-slate-200 pr-12 h-12 focus-visible:ring-[#0095da] focus-visible:ring-offset-0"
            style={{
              '--color-ring': brandColour || '#0095da'
            }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
          <Button 
            size="icon" 
            className="absolute right-1 top-1 rounded-full text-white hover:bg-blue-600 h-10 w-10 transition-all"
            style={{ backgroundColor: brandColour || '#0095da' }}
            onClick={handleSend}
            disabled={!inputValue.trim() || disabled}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          Educational information only. Not a substitute for professional medical advice.
        </p>
        <p className="text-[10px] text-slate-400">
          Powered by <span className="font-bold text-slate-600">NeurascaleX</span>
        </p>
      </div>
    </div>
  );
}
