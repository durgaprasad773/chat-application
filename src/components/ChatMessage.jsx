export default function ChatMessage({ text, sender, timestamp, isError, metadata }) {
  const isUser = sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
          AI
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 md:px-5 md:py-4 rounded-2xl ${
          isError
            ? 'bg-red-50 text-red-800 rounded-bl-sm border border-red-200'
            : isUser
            ? 'bg-primary-600 text-white rounded-br-sm'
            : 'bg-white text-gray-900 rounded-bl-sm shadow-sm border border-secondary-100'
        } break-words text-sm md:text-base leading-relaxed font-normal`}
      >
        {text}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-700 font-semibold text-sm md:text-base flex-shrink-0">
          U
        </div>
      )}
    </div>
  )
}
