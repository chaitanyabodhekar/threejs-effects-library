import React from 'react';
import ReactDOM from 'react-dom/client';
import LiquidEffect01 from './LiquidEffect01';

/**
 * Mounts the LiquidEffect01 as a transparent overlay on the page.
 * @param {HTMLElement} container - The container to mount into (default: document.body)
 * @param {Object} props - Optional props for the effect
 * @returns {Function} - A function to unmount the overlay
 */
export function mountLiquidOverlay(container = document.body, props = {}) {
  // Safety check to avoid duplicate mounting
  if (document.getElementById('liquid-effect-overlay-root')) {
    console.warn('Liquid overlay already mounted, skipping.');
    return () => {};
  }

  console.log('Mounting Liquid Overlay...');

  // Create a container div for the React root
  const rootDiv = document.createElement('div');
  rootDiv.id = 'liquid-effect-overlay-root';
  rootDiv.style.position = 'fixed';
  rootDiv.style.top = '0';
  rootDiv.style.left = '0';
  rootDiv.style.width = '100vw';
  rootDiv.style.height = '100vh';
  rootDiv.style.pointerEvents = 'none';
  rootDiv.style.zIndex = '9999';
  rootDiv.style.background = 'transparent'; // Ensure transparent background

  container.appendChild(rootDiv);

  const root = ReactDOM.createRoot(rootDiv);
  
  root.render(
    <LiquidEffect01 
      overlayMode={true} 
      {...props} 
    />
  );

  // Return a cleanup function
  return () => {
    console.log('Unmounting Liquid Overlay...');
    root.unmount();
    if (container.contains(rootDiv)) {
      container.removeChild(rootDiv);
    }
  };
}