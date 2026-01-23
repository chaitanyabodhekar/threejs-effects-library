import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { mountLiquidOverlay } from './effects/LiquidEffect01'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Mount the liquid overlay after the app loads
setTimeout(() => {
  mountLiquidOverlay(document.body, { overlayMode: true });
}, 100);