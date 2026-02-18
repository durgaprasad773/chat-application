import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Fade out duration
    }, 2500); // Display duration before fade out

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`splash-screen ${!isAnimating ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-out',
        opacity: isAnimating ? 1 : 0,
      }}
    >
      <div className="logo-container">
        <svg
          viewBox="0 0 400 120"
          style={{
            width: 'min(80vw, 500px)',
            height: 'auto',
          }}
        >
          <defs>
            {/* Gradient for the text */}
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 196, 214)" />
              <stop offset="100%" stopColor="rgb(91, 226, 255)" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Shadow filter */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgb(0, 196, 214)" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Main text with animation */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="url(#textGradient)"
            filter="url(#shadow)"
            style={{
              fontSize: '52px',
              fontWeight: '900',
              fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
            className="logo-text"
          >
            NeurascaleX
          </text>

          {/* Subtitle */}
          <text
            x="50%"
            y="85%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="#ffffff"
            style={{
              fontSize: '12px',
              fontWeight: '300',
              fontFamily: "'Segoe UI', 'Roboto', sans-serif",
              letterSpacing: '8px',
              textTransform: 'uppercase',
              opacity: 0.7,
            }}
            className="tagline-text"
          >
            AI Powered
          </text>
        </svg>

        {/* Animated lines */}
        <div className="line-animation">
          <div className="line line-left"></div>
          <div className="line line-right"></div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .splash-screen {
          background: radial-gradient(ellipse at center, #001a1c 0%, #000000 70%);
        }

        .logo-container {
          position: relative;
          animation: scaleIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .logo-text {
          animation: textReveal 1.5s ease-out forwards, textGlow 2s ease-in-out infinite;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            filter: url(#shadow) brightness(1);
          }
          50% {
            filter: url(#glow) brightness(1.2);
          }
        }

        .tagline-text {
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .line-animation {
          position: absolute;
          width: 100%;
          height: 2px;
          top: 50%;
          left: 0;
          display: flex;
          justify-content: center;
        }

        .line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgb(0, 196, 214), transparent);
          animation: lineExpand 1.2s ease-out forwards;
        }

        .line-left {
          right: 50%;
          transform-origin: right;
        }

        .line-right {
          left: 50%;
          transform-origin: left;
        }

        @keyframes lineExpand {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 40%;
            opacity: 0;
          }
        }

        .fade-out {
          opacity: 0 !important;
          pointer-events: none;
        }

        /* Particles effect */
        .logo-container::before,
        .logo-container::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgb(91, 226, 255);
          border-radius: 50%;
          animation: particle 2s ease-out infinite;
        }

        .logo-container::before {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .logo-container::after {
          top: 80%;
          right: 10%;
          animation-delay: 1s;
        }

        @keyframes particle {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
