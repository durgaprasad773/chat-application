// API Configuration
// For local development, use the proxied endpoint (via Vite dev server)
// For production, use the full absolute URL
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net'
    : '', // Use relative path for dev proxy (localhost:5173 will handle routing)
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
