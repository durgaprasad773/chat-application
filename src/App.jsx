import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'
import chatService from './services/chatService'
import { getOrCreateSessionId, clearSessionId } from './config/api'

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sessionId, setSessionId] = useState('')
  const inputRef = useRef(null)

  // Initialize session on component mount
  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)
  }, [])

  const handleSendMessage = async (text) => {
    if (!text.trim() || !sessionId) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Call the AI API
      const response = await chatService.sendMessage(text.trim(), sessionId)

      const aiMessage = {
        id: messages.length + 2,
        text: response.message,
        sender: 'ai',
        timestamp: new Date(response.timestamp || new Date()),
        metadata: {
          intent: response.intent,
          topic: response.topic,
          contextSources: response.context_sources,
          conversationStage: response.conversation_stage,
          followUpQuestion: response.follow_up_question,
          suggestedTopics: response.suggested_topics,
          userInterests: response.user_interests,
        },
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error('Message sending error:', err)
      setError(err.message)

      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: `Sorry, there was an error: ${err.message}. Please try again.`,
        sender: 'ai',
        timestamp: new Date(),
        isError: true,
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestart = () => {
    // Clear session and create new one
    clearSessionId()
    const newSessionId = getOrCreateSessionId()
    setSessionId(newSessionId)

    // Reset messages
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI Assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ])

    setError(null)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-primary-50 overflow-hidden fixed inset-0">
      {/* Header */}
      <Header onRestart={handleRestart} />

      {/* Chat Container - Only this scrolls */}
      <ChatContainer messages={messages} isLoading={isLoading} error={error} />

      {/* Input Area - Fixed at bottom */}
      <ChatInput onSendMessage={handleSendMessage} inputRef={inputRef} isLoading={isLoading} />
    </div>
  )
}
