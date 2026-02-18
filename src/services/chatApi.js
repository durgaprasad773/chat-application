// API URLs Configuration
export const API_URLS = {
  pythonApi: 'https://neurax-python-be-emhfejathhhpe6h3.uksouth-01.azurewebsites.net',
  dotnetApi: 'https://neurax-net-f2cwbugzh4gqd8hg.uksouth-01.azurewebsites.net'
};

// Direct widget ID (no API call needed)
export const WIDGET_ID = 'ce0e9578-e1e3-4bee-a665-cbf12fc8db84';

// Fetch chat response
export async function fetchImprovedChatResponse(message, sessionId, chatbotId = null, apiBaseUrl = '') {
  try {
    const requestPayload = {
      message: message,
      session_id: sessionId,
      index_name: 'default'
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${apiBaseUrl}/nexus/ai/widget/chat`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}

// Clear chat session
export async function clearImprovedChatSession(sessionId, chatbotId = null, apiBaseUrl = '') {
  try {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${apiBaseUrl}/nexus/ai/widget/session/${sessionId}/clear`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error clearing chat session:', error);
    throw error;
  }
}

// Save reaction
export async function saveReaction(sessionId, messageId, reaction, chatbotId = null, apiBaseUrl = '') {
  try {
    const requestPayload = {
      session_id: sessionId,
      message_id: parseInt(messageId),
      reaction: reaction
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${apiBaseUrl}/nexus/ai/widget/chat/reaction`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving reaction:', error);
    throw new Error('Failed to save reaction. Please try again.');
  }
}

// Send email
export async function sendEmail(name, email, message, chatbotId = null) {
  try {
    const requestPayload = {
      Name: name,
      ContactPersonEmail: email,
      Message: message
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/SendAnEmail_Widget/SendMail`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please try again.');
  }
}

// Get clinic settings
export async function getClinicSettings(chatbotId = null) {
  try {
    const headers = {
      accept: 'text/plain',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/Settings_Widget/Get`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clinic settings:', error);
    throw new Error('Failed to load clinic settings. Please try again.');
  }
}

// Get starter questions
export async function getStarterQuestions(chatbotId = null) {
  try {
    const headers = {
      accept: 'text/plain',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/StarterQuestions_Widget/Get`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching starter questions:', error);
    throw new Error('Failed to load starter questions. Please try again.');
  }
}

// Get doctor details
export async function getDoctorDetails(chatbotId = null) {
  try {
    const headers = {
      accept: 'text/plain',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/Staff_Widget/GetDoctorDetails`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    throw new Error('Failed to load doctor details. Please try again.');
  }
}

// Fetch user IP
export async function fetchUserIP() {
  try {
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://httpbin.org/ip'
    ];

    for (const service of ipServices) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(service, {
          signal: controller.signal,
          timeout: 3000
        });
        clearTimeout(timeoutId);

        if (!response.ok) continue;

        const data = await response.json();

        if (data.ip) {
          return data.ip;
        } else if (data.origin) {
          return data.origin;
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`Timeout fetching IP from ${service}`);
        } else {
          console.warn(`Failed to fetch IP from ${service}:`, error.message);
        }
        continue;
      }
    }

    console.warn('All IP services failed, using fallback');
    return '127.0.0.1';
  } catch (error) {
    console.error('Error fetching user IP:', error);
    return '127.0.0.1';
  }
}

// Insert user chat session
export async function insertUserChatSession(ipAddress, chatbotId = null) {
  try {
    const sessionStartTime = new Date().toISOString();

    const requestPayload = {
      IPAddress: ipAddress,
      SessionStartTime: sessionStartTime
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/UserChatSession_Widget/Insert`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sessionId = await response.text();
    console.log('User chat session inserted with ID:', sessionId);
    return sessionId.trim();
  } catch (error) {
    console.error('Error inserting user chat session:', error);
    throw new Error('Failed to initialize chat session tracking.');
  }
}

// Track button click
export async function trackButtonClick(userChatSessionId, buttonLabel, chatbotId = null) {
  try {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en', { month: 'short' });
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    const requestPayload = {
      UserChatSessionId: userChatSessionId,
      Click: buttonLabel,
      Timestamp: timestamp
    };

    const headers = {
      'Content-Type': 'application/json',
      accept: 'text/plain',
    };

    if (chatbotId) {
      headers['x-widget-key'] = chatbotId;
    }

    const response = await fetch(`${API_URLS.dotnetApi}/BookNowClicks_Widget/Insert`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    console.log('Button click tracked:', buttonLabel, data);
    return data;
  } catch (error) {
    console.error('Error tracking button click:', error);
    throw new Error('Failed to track button click.');
  }
}
