import React from 'react';
import { parseMarkdown, formatTime } from '../utils/helpers';
import { Button } from "@/components/ui/button";

export function Message({
  message,
  onReaction,
  onFollowUp,
  onTopic,
  isLatestBotMessage,
  brandColour,
  logoUrl,
  clinicName
}) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col mb-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && (
        <div className="flex items-center gap-1.5 mb-1">
          {logoUrl ? (
            <div className="w-[18px] h-[18px] rounded-full overflow-hidden">
              <img 
                src={logoUrl} 
                alt={clinicName} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-br from-[#005B9A] to-[#0891B2] flex items-center justify-center"><span class="text-[8px] text-white font-bold">AI</span></div>';
                }}
              />
            </div>
          ) : (
            <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#005B9A] to-[#0891B2] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          )}
          <span className="text-[10px] text-[#94A3B8] font-medium">{clinicName || 'AI Assistant'}</span>
        </div>
      )}
      
      <div
        className={`px-3.5 py-2.5 max-w-[88%] break-words shadow-sm ${
          isUser
            ? 'rounded-[14px_4px_14px_14px] bg-[#005B9A] text-white shadow-[0_2px_10px_rgba(0,91,154,.25)]'
            : 'rounded-[4px_14px_14px_14px] bg-white text-[#0F172A] border border-[#E2E8F0] shadow-[0_1px_6px_rgba(0,0,0,.07)]'
        }`}
      >
        <div
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
        />
        
        {/* Action Button from API response */}
        {!isUser && message.hasActionButton && message.actionButtonText && message.actionButtonUrl && (
          <Button
            variant="outline"
            className="rounded-full border-[#005B9A] text-[#005B9A] hover:bg-blue-50 px-4 text-xs font-medium mt-2"
            onClick={() => window.open(message.actionButtonUrl, '_blank', 'noopener,noreferrer')}
          >
            {message.actionButtonText}
          </Button>
        )}
      </div>

      {/* Reaction buttons */}
      {message.sender === 'bot' &&
        message.message_id &&
        !message.isError &&
        isLatestBotMessage && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() =>
                onReaction(
                  message.message_id,
                  message.session_id,
                  true
                )
              }
              className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
                message.userReaction === true
                  ? 'bg-green-100 text-green-600 scale-105 border-2 border-green-400'
                  : 'bg-white border border-[#E2E8F0] hover:scale-105 hover:bg-slate-50'
              }`}
              title="Like this response"
            >
              👍
            </button>
            <button
              onClick={() =>
                onReaction(
                  message.message_id,
                  message.session_id,
                  false
                )
              }
              className={`w-7 h-7 rounded-full flex items-center justify-center transition text-xs ${
                message.userReaction === false
                  ? 'bg-red-100 text-red-600 scale-105 border-2 border-red-400'
                  : 'bg-white border border-[#E2E8F0] hover:scale-105 hover:bg-slate-50'
              }`}
              title="Dislike this response"
            >
              👎
            </button>
          </div>
        )}
    </div>
  );
}
