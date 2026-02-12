import React from 'react';
import { parseMarkdown, formatTime } from '../utils/helpers';

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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex flex-col ${
          isUser ? 'items-end' : 'items-start'
        } max-w-[80%]`}
      >
        <div
          className={`px-4 py-3 rounded-2xl max-w-full break-words ${
            isUser
              ? `text-white`
              : 'bg-gray-100 border border-gray-200 text-black'
          }`}
          style={isUser ? { backgroundColor: brandColour || '#667eea' } : {}}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
        />

        {/* Reaction buttons */}
        {message.sender === 'bot' &&
          message.message_id &&
          !message.isError &&
          isLatestBotMessage && (
            <div className="flex gap-3 mt-2">
              <button
                onClick={() =>
                  onReaction(
                    message.message_id,
                    message.session_id,
                    true
                  )
                }
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  message.userReaction === true
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-white border border-gray-200 hover:scale-105'
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
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  message.userReaction === false
                    ? 'bg-red-500 text-white scale-105'
                    : 'bg-white border border-gray-200 hover:scale-105'
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
            <button
              onClick={() => onFollowUp(message.followUpQuestion)}
              className="mt-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-300 rounded-lg px-3 py-2 text-sm text-purple-900 hover:shadow-md transition flex items-center gap-2"
              title="Click to ask this question"
            >
              <span>💡</span>
              <span>{message.followUpQuestion}</span>
              <span>→</span>
            </button>
          )}

        {/* Suggested topics */}
        {isLatestBotMessage &&
          message.suggestedTopics &&
          message.suggestedTopics.length > 0 &&
          !message.isError && (
            <div className="mt-2 w-full">
              <div className="text-xs text-gray-600 font-semibold mb-1">
                🏷️ Suggested Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {message.suggestedTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTopic(topic)}
                    className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-300 text-blue-700 px-2 py-1 rounded-full text-xs hover:shadow-md transition"
                    title={`Click to ask about: ${topic}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

        <div className="text-xs text-gray-500 mt-1 px-1">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
