import { API_CONFIG } from '../config/api'

class ChatService {
  constructor() {
    this.apiBaseURL = API_CONFIG.BASE_URL
    this.chatbotId = API_CONFIG.WIDGET_KEY
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
      const requestPayload = {
        message: message,
        session_id: sessionId,
        index_name: indexName,
      }

      const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      }

      // Add x-widget-key header if chatbotId is provided
      if (this.chatbotId) {
        headers['x-widget-key'] = this.chatbotId
      }

      // Build the full URL - for dev use relative path (proxy), for prod use absolute URL
      const url = this.apiBaseURL 
        ? `${this.apiBaseURL}${API_CONFIG.ENDPOINTS.CHAT}`
        : API_CONFIG.ENDPOINTS.CHAT

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestPayload),
      })

      if (!response.ok) {
        if (response.status === 422) {
          const error = await response.json()
          throw new Error(`Validation Error: ${JSON.stringify(error.detail)}`)
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching widget chat response:', error)
      throw new Error('Failed to get AI response. Please try again.')
    }
  }
}

export default new ChatService()
