import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LiquidEffect01 from './effects/LiquidEffect01'

// Render Main App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Render Liquid Overlay in separate root
const overlayRoot = document.getElementById('liquid-overlay');
if (overlayRoot) {
  ReactDOM.createRoot(overlayRoot).render(
    <React.StrictMode>
      <LiquidEffect01 overlayMode={true} />
    </React.StrictMode>
  );
}