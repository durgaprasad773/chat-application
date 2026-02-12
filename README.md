# Responsive Chatbot Application

A fully responsive chatbot application built with React and Tailwind CSS, featuring a mobile-first design approach.

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
- Real-time message display
- User and AI message differentiation
- Auto-scroll to latest messages
- Typing indicator animation
- Message timestamps

### 🎯 Header
- Circular profile image/avatar
- Assistant name and title
- Sticky header on all devices
- Restart chat button with icon

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

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top header with profile and restart button
│   ├── ChatContainer.jsx   # Main chat area with message list
│   ├── ChatMessage.jsx     # Individual message component
│   └── ChatInput.jsx       # Input field and send button
├── App.jsx                 # Main app component
├── index.css              # Global styles and Tailwind imports
└── main.jsx               # Entry point
```

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
- Max-width container for readability
- Proper spacing between messages

### Chat Message
- User/AI differentiation with different styles
- Avatar for each sender
- Message timestamps
- Proper text wrapping
- Responsive font sizes

### Chat Input
- Fixed position at bottom
- Send button with enter key support
- Character counter (500 char limit)
- Focus ring styling
- Disabled state for empty input
- Multi-line support with Shift+Enter

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

## Development

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## Future Enhancements

- Chat history/sidebar
- User authentication
- Database integration
- Voice input/output
- File sharing
- Dark mode toggle
- Multi-language support
