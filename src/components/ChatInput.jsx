import { useState, forwardRef } from 'react'
import { Send } from 'lucide-react'

const ChatInput = forwardRef(({ onSendMessage, isLoading }, ref) => {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput('')
      ref.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    // Send on Enter (not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full bg-white border-t border-secondary-100 pb-safe-bottom">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className={`flex items-end gap-2 md:gap-3 rounded-xl transition-all duration-200 ${
          isFocused
            ? 'ring-2 ring-primary-500 ring-offset-0'
            : 'ring-1 ring-secondary-200'
        } bg-secondary-50 p-2 md:p-3`}>
          {/* Input Field */}
          <input
            ref={ref}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-0 outline-none text-sm md:text-base text-secondary-900 placeholder-secondary-400 px-2 py-2 md:px-3 md:py-3 focus:ring-0 min-h-touch md:min-h-auto disabled:opacity-50 disabled:cursor-not-allowed"
            maxLength={500}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 p-2 md:p-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 text-white transition-all duration-200 touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed"
            aria-label="Send message"
            title="Send"
          >
            <Send size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Character count (optional) */}
        <div className="text-xs text-secondary-400 mt-2 px-2">
          {input.length > 0 && `${input.length}/500`}
          {isLoading && <span className="ml-2">Sending...</span>}
        </div>
      </form>
    </div>
  )
})

ChatInput.displayName = 'ChatInput'

export default ChatInput
