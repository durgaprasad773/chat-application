import React from 'react';
import { flushSync } from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Render synchronously so every link and section exists before DOMContentLoaded.
// nsx-attribution.js decorates booking links and observes sections at that moment.
flushSync(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
