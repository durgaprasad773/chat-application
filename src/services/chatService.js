import { API_CONFIG } from '../config/api'

class ChatService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.widgetKey = API_CONFIG.WIDGET_KEY
  }

  /**
   * Send chat message to AI endpoint
   * @param {string} message - The user message
   * @param {string} sessionId - The session ID to maintain conversation
   * @param {string} indexName - Optional index name (uses widget key if available)
   * @returns {Promise<Object>} - AI response object
   */
  async sendMessage(message, sessionId, indexName = 'veera') {
    try {
      const payload = {
        message: message,
        session_id: sessionId,
        index_name: indexName,
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      // Add widget key if configured
      if (this.widgetKey && this.widgetKey !== 'your-widget-key') {
        headers['x-widget-key'] = this.widgetKey
      }

      const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.CHAT}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        if (response.status === 422) {
          const error = await response.json()
          throw new Error(`Validation Error: ${JSON.stringify(error.detail)}`)
        }
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Chat API Error:', error)
      throw error
    }
  }
}

export default new ChatService()
