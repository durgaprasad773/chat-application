import React from 'react';
import { motion } from "motion/react";
import { parseMarkdown, formatTime } from '../utils/helpers';
import { Button } from "@/components/ui/button";

export function Message({
  message,
  onReaction,
  onFollowUp,
  onTopic,
  isLatestBotMessage,
  brandColour
}) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`flex flex-col ${
          isUser ? 'items-end' : 'items-start'
        } max-w-[85%]`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`px-5 py-3 rounded-2xl max-w-full break-words shadow-sm ${
            isUser
              ? `text-white rounded-tr-none`
              : 'bg-[#f1f5f9] rounded-tl-none text-slate-700'
          }`}
          style={isUser ? { backgroundColor: brandColour || '#0095da' } : {}}
        >
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
          />
          
          {/* Action Button from API response */}
          {!isUser && message.hasActionButton && message.actionButtonText && message.actionButtonUrl && (
            <Button
              variant="outline"
              className="rounded-full border-[#0095da] text-[#0095da] hover:bg-blue-50 px-6 font-medium mt-3"
              style={{
                borderColor: brandColour || '#0095da',
                color: brandColour || '#0095da'
              }}
              onClick={() => window.open(message.actionButtonUrl, '_blank', 'noopener,noreferrer')}
            >
              {message.actionButtonText}
            </Button>
          )}
        </motion.div>

        <div className="text-[10px] text-slate-400 mt-1 ml-1">
          {formatTime(message.timestamp)}
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  message.userReaction === true
                    ? 'bg-green-100 text-green-600 scale-105 border-2 border-green-400'
                    : 'bg-white border border-slate-200 hover:scale-105 hover:bg-slate-50'
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                  message.userReaction === false
                    ? 'bg-red-100 text-red-600 scale-105 border-2 border-red-400'
                    : 'bg-white border border-slate-200 hover:scale-105 hover:bg-slate-50'
                }`}
                title="Dislike this response"
              >
                👎
              </button>
            </div>
          )}

        {/* Follow-up question */}
        {isLatestBotMessage &&
          message.followUpQuestion &&
          !message.isError && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFollowUp(message.followUpQuestion)}
              className="mt-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 transition flex items-center gap-2 shadow-sm"
              title="Click to ask this question"
            >
              <span>💡</span>
              <span className="font-medium">{message.followUpQuestion}</span>
            </motion.button>
          )}

        {/* Suggested topics */}
        {isLatestBotMessage &&
          message.suggestedTopics &&
          message.suggestedTopics.length > 0 &&
          !message.isError && (
            <div className="mt-3 w-full">
              <div className="text-xs text-slate-500 font-semibold mb-2">
                Suggested Topics:
              </div>
              <div className="flex flex-wrap gap-2">
                {message.suggestedTopics.map((topic, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTopic(topic)}
                    className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs hover:bg-slate-50 hover:border-blue-300 transition shadow-sm"
                    title={`Click to ask about: ${topic}`}
                  >
                    {topic}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
