import React, { useState, useEffect } from 'react';
import { ChatbotFullPage } from './components/ChatbotFullPage';
import SplashScreen from './components/SplashScreen';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div 
        className="w-screen" 
        style={{ 
          height: '100dvh',
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.3s ease-in'
        }}
      >
        <ChatbotFullPage />
      </div>
    </>
  );
}

export default App;
