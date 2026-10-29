import React from 'react';
import {
  parseMarkdown,
  formatTime,
  isBookingUrl,
  decorateBookingUrl,
  decorateBookingLinksInHtml,
  trackLeadCaptured,
} from '../utils/helpers';
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
  const topic = message.topic || 'general';

  const openActionUrl = (url) => {
    if (isBookingUrl(url)) trackLeadCaptured();
    window.open(decorateBookingUrl(url, topic), '_blank', 'noopener,noreferrer');
  };

  // Links inside the answer text: record the booking route when one is followed
  const handleBodyClick = (e) => {
    const link = e.target.closest && e.target.closest('a');
    if (link && isBookingUrl(link.href)) trackLeadCaptured();
  };

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
                  e.target.parentElement.innerHTML = '<div class="w-full h-full rounded-full bg-[#075a85] flex items-center justify-center"><span class="text-[8px] text-white font-bold">AI</span></div>';
                }}
              />
            </div>
          ) : (
            <div className="w-[18px] h-[18px] rounded-full bg-[#075a85] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          )}
          <span className="text-[10px] text-[#4f6474] font-medium">{clinicName || 'AI Assistant'}</span>
        </div>
      )}
      
      <div
        style={isUser ? {
          padding: '10px 14px',
          maxWidth: '88%',
          wordBreak: 'break-words',
          borderRadius: '14px 4px 14px 14px',
          background: '#075a85',
          color: '#fff',
          boxShadow: '0 2px 10px rgba(7,90,133,.22)',
        } : {
          padding: '16px',
          maxWidth: '88%',
          wordBreak: 'break-words',
          background: '#fff',
          border: '1px solid #e3e9ee',
          borderRadius: '16px',
          borderTopLeftRadius: '6px',
          boxShadow: '0 4px 14px rgba(19,41,58,.06)',
          color: '#13293a',
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        <div
          className="leading-relaxed"
          onClick={handleBodyClick}
          dangerouslySetInnerHTML={{ __html: decorateBookingLinksInHtml(parseMarkdown(message.text), topic) }}
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
                  className="rounded-full border-[#075a85] text-[#075a85] hover:bg-[#eaf3f8] px-4 text-xs font-semibold"
                  onClick={() => openActionUrl(url)}
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
