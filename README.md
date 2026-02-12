# Responsive Chatbot Application

A fully responsive chatbot application built with React and Tailwind CSS, featuring a mobile-first design approach with AI-powered backend integration.

## Features

### 📱 Mobile-First Design
- Optimized for mobile devices (320px - 428px)
- Responsive layout that adapts to all screen sizes
- No horizontal scrolling
- Efficient use of screen space

### 🎨 Professional UI
- Clean, modern interface with proper spacing
- Professional color palette (neutral + accent colors)
- Clear typography hierarchy
- Smooth animations and transitions

### 💬 Chat Features
- Real-time message display with AI backend integration
- User and AI message differentiation
- Auto-scroll to latest messages
- Typing indicator animation
- Message timestamps and metadata display

### 🔌 API Integration
- Integrated with `/nexus/ai/widget/chat` AI endpoint
- Session management for conversation continuity
- Widget-based authentication support
- Full API response metadata display (intent, topics, sources)
- Error handling and resilience

### 🎯 Header
- Circular profile image/avatar
- Assistant name and title
- Sticky header on all devices
- Restart chat button with icon
- Session management (creates unique session per chat)

### 📐 Touch-Friendly
- Minimum 44x44px touch targets
- Optimized for one-handed use
- Proper spacing for finger interaction
- Fast, smooth interactions

### 🖥️ Desktop Enhancements
- Wider chat container with max-width
- Hover states for interactive elements
- Improved readability
- Keyboard navigation support

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS 3** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Installation

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Update .env.local with your API credentials
# Edit .env.local and set:
# - REACT_APP_API_BASE_URL = your API endpoint
# - REACT_APP_WIDGET_KEY = your widget authentication key

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Base URL
REACT_APP_API_BASE_URL=https://your-api-domain.com

# Optional: Widget Key for widget-based authentication
REACT_APP_WIDGET_KEY=your-widget-key
```

### API Configuration

The chatbot integrates with the `/nexus/ai/widget/chat` endpoint with the following features:

**Authentication:**
- Widget key authentication via `x-widget-key` header (optional)
- Automatically added if provided in environment

**Request Payload:**
```json
{
  "message": "User message text",
  "session_id": "user-session-id",
  "index_name": "veera"
}
```

**Response Payload:**
```json
{
  "message": "AI response text",
  "session_id": "user-session-id",
  "intent": "INITIAL_INQUIRY",
  "topic": "pain symptoms",
  "context_sources": 3,
  "conversation_stage": 1,
  "follow_up_question": "Would you like to know more?",
  "suggested_topics": ["topic1", "topic2"],
  "user_interests": ["interest1", "interest2"],
  "timestamp": "2025-08-15T10:30:00"
}
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top header with profile and restart button
│   ├── ChatContainer.jsx   # Main chat area with message list
│   ├── ChatMessage.jsx     # Individual message component with metadata
│   └── ChatInput.jsx       # Input field and send button
├── config/
│   └── api.js             # API configuration and session management
├── services/
│   └── chatService.js     # Chat API service integration
├── App.jsx                 # Main app component
├── index.css              # Global styles and Tailwind imports
└── main.jsx               # Entry point
```

## Session Management

The application automatically manages user sessions:

- **Session ID Generation**: Creates a unique session ID on first visit
- **Session Persistence**: Stores session ID in localStorage for continuity
- **Session Reset**: Clears session on "Restart Chat" button click
- **Session ID Format**: `session-{timestamp}-{random}`

Each message maintains the same session ID to preserve conversation context across multiple interactions.

## API Service

The `chatService` module handles all API communication:

```javascript
import chatService from './services/chatService'

// Send a message (session management is automatic)
const response = await chatService.sendMessage(
  userMessage,
  sessionId,
  indexName // optional, defaults to 'veera'
)
```

## Error Handling

The application includes comprehensive error handling:

- API error messages are displayed to users
- Validation errors are caught and reported
- Network errors are handled gracefully
- Error messages appear in chat interface
- Console logging for debugging

## Responsive Breakpoints

- **Mobile**: 320px - 768px (default/sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px+ (lg)

## Accessibility

- WCAG 2.1 compliant
- Keyboard navigation support
- Focus indicators for interactive elements
- Proper semantic HTML
- ARIA labels for icon buttons
- Proper color contrast
- Touch-friendly interface

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Header Component
- Sticky positioning for easy access
- Profile avatar with gradient
- Assistant name display
- Restart button with hover and active states
- Responsive padding and sizing

### Chat Container
- Scrollable message list
- Auto-scroll to new messages
- Loading indicator with animation
- Error banner display
- Max-width container for readability
- Proper spacing between messages

### Chat Message
- User/AI differentiation with different styles
- Avatar for each sender
- Message metadata display (intent, topic, sources, suggestions)
- Error state styling
- Proper text wrapping
- Responsive font sizes

### Chat Input
- Fixed position at bottom
- Send button with enter key support
- Character counter (500 char limit)
- Focus ring styling
- Disabled state for empty input or loading
- Multi-line support with Shift+Enter
- Loading indicator

## Customization

### Colors
Modify the color palette in `tailwind.config.js`:
- Primary color: Used for AI avatar, buttons, and accents
- Secondary color: Used for text and neutral elements

### Fonts
Default font is Inter from Google Fonts. Change in `tailwind.config.js` or update the font-family CSS variable.

### Spacing
All spacing is based on Tailwind's default 4px grid. Adjust in `tailwind.config.js`.

## Performance

- Optimized re-renders with React hooks
- Smooth animations using CSS
- Lazy loading ready
- Small bundle size with Vite
- Efficient session management using localStorage

## Development

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## Deployment

### Azure Static Web Apps
The project includes Azure Static Web Apps workflow configuration:

1. **Automatic Builds**: Triggered on push to `main` branch
2. **Output Location**: `dist/` (Vite's build output)
3. **Environment Variables**: Set in Azure portal or workflow secrets
4. **Authentication**: Uses OIDC token for secure deployments

### Production Build
```bash
npm run build
# Output: dist/ directory ready for deployment
```

## Future Enhancements

- Chat history/sidebar
- User authentication
- Database integration
- Voice input/output
- File sharing
- Dark mode toggle
- Multi-language support
- Real-time typing indicators
- Message reactions/emojis
- User preferences storage
