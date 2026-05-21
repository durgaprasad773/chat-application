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
        style={isUser ? {
          padding: '10px 14px',
          maxWidth: '88%',
          wordBreak: 'break-words',
          borderRadius: '14px 4px 14px 14px',
          background: '#1f5f64',
          color: '#fff',
          boxShadow: '0 2px 10px rgba(31,95,100,.22)',
        } : {
          padding: '16px',
          maxWidth: '88%',
          wordBreak: 'break-words',
          background: '#fff',
          border: '1px solid #dce8ee',
          borderRadius: '18px',
          borderTopLeftRadius: '8px',
          boxShadow: '0 8px 22px rgba(18,45,60,.06)',
          color: '#213244',
          fontSize: 15,
          lineHeight: 1.62,
        }}
      >
        <div
          className="leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
        />
        
        {/* Action Buttons from API response */}
        {!isUser && message.hasActionButton && message.actionButtons && message.actionButtons.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actionButtons.map((btnObj, idx) => {
              const label = Object.keys(btnObj)[0];
              const url = btnObj[label];
              return (
                <Button
                  key={idx}
                  variant="outline"
                  className="rounded-full border-[#1f5f64] text-[#1f5f64] hover:bg-[#eaf5f7] px-4 text-xs font-medium"
                  onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                >
                  {label}
                </Button>
              );
            })}
          </div>
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
