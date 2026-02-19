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
        className="w-screen bg-gray-100 flex items-center justify-center" 
        style={{ 
          height: '100dvh',
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 0.3s ease-in',
          padding: 'clamp(0px, 2vw, 24px)'
        }}
      >
        <div 
          className="w-full h-full max-w-4xl rounded-none md:rounded-2xl overflow-hidden shadow-none md:shadow-2xl"
          style={{
            maxHeight: '100%'
          }}
        >
          <ChatbotFullPage />
        </div>
      </div>
    </>
  );
}

export default App;
