import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'

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
  const inputRef = useRef(null)

  const handleSendMessage = (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: getAIResponse(text),
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 800)
  }

  const getAIResponse = (userText) => {
    const responses = {
      hello: "Hello! It's great to chat with you. What would you like to know?",
      help: "I'm here to assist you! Feel free to ask me anything.",
      how: "I'm doing well, thanks for asking! How can I help you today?",
      what: "I'm an AI Assistant designed to help answer your questions and provide support.",
      default: "That's an interesting question! I'm learning more about it. How can I assist you further?",
    }

    const lowerText = userText.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowerText.includes(key)) return value
    }
    return responses.default
  }

  const handleRestart = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI Assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ])
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col h-screen w-full bg-primary-50 overflow-hidden">
      {/* Header */}
      <Header onRestart={handleRestart} />

      {/* Chat Container */}
      <ChatContainer messages={messages} isLoading={isLoading} />

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} inputRef={inputRef} />
    </div>
  )
}
