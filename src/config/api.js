// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://your-production-api-url.com', // Replace with your actual API URL
  WIDGET_KEY: 'bb99a847-2437-4d34-9f82-6485ffde3265',
  ENDPOINTS: {
    CHAT: '/nexus/ai/widget/chat',
  },
}

// Generate a unique session ID for the user
export const generateSessionId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `session-${timestamp}-${random}`
}

// Get or create session ID from localStorage
export const getOrCreateSessionId = () => {
  const storageKey = 'chatbot_session_id'
  let sessionId = localStorage.getItem(storageKey)

  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem(storageKey, sessionId)
  }

  return sessionId
}

// Clear session ID (for restart functionality)
export const clearSessionId = () => {
  localStorage.removeItem('chatbot_session_id')
}
