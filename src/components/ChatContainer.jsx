import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'

export default function ChatContainer({ messages, isLoading, error }) {
  const containerRef = useRef(null)
  const endRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto overscroll-contain bg-primary-50 scrollbar"
    >
      <div className="w-full px-4 py-4 md:px-6 md:py-6">
        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-4 md:space-y-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
              isError={message.isError}
              metadata={message.metadata}
            />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-end gap-2 animate-fade-in">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                AI
              </div>
              <div className="px-4 py-3 md:px-5 md:py-4 bg-white rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-secondary-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-secondary-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-secondary-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          {/* Invisible ref for scroll target */}
          <div ref={endRef} className="h-1" />
        </div>
      </div>
    </div>
  )
}
