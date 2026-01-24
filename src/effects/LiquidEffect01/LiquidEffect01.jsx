import { useEffect, useRef } from "react";
import { defaultConfig } from "./config";
import "./styles.css";

export default function LiquidEffect01({ 
  className = "", 
  id = "liquid-canvas-01",
  imageUrl = defaultConfig.imageUrl,
  metalness = defaultConfig.metalness,
  roughness = defaultConfig.roughness,
  displacementScale = defaultConfig.displacementScale,
  enableRain = defaultConfig.enableRain,
  overlayMode = false
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Hack to force alpha: true on the WebGL context
    const originalGetContext = canvas.getContext;
    canvas.getContext = function(type, options) {
      if (type === 'webgl' || type === 'webgl2') {
        const newOptions = { ...options, alpha: true, antialias: true };
        return originalGetContext.call(this, type, newOptions);
      }
      return originalGetContext.call(this, type, options);
    };

    // Load the script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('${id}');
      if (canvas) {
        // Initialize app
        const app = LiquidBackground(canvas);
        
        // Configuration
        ${!overlayMode ? `app.loadImage('${imageUrl}');` : ''}
        app.liquidPlane.material.metalness = ${metalness};
        app.liquidPlane.material.roughness = ${roughness};
        app.liquidPlane.uniforms.displacementScale.value = ${displacementScale};
        app.setRain(${enableRain});
        
        // Force Transparency
        if (app.renderer) {
          app.renderer.setClearColor(0x000000, 0);
          
          if (app.scene) {
            app.scene.background = null;
          }
        }

        // Additional transparency for overlay mode
        ${overlayMode ? `
        if (app.liquidPlane && app.liquidPlane.material) {
           app.liquidPlane.material.transparent = true;
           app.liquidPlane.material.opacity = 0.5; // Make it semi-transparent
           // If the library supports it, we might want to set blending or other props
        }
        ` : ''}
        
        window.__liquidApp_${id.replace(/[^a-zA-Z0-9]/g, '_')} = app;
      }
    `;

    document.body.appendChild(script);

    return () => {
      canvas.getContext = originalGetContext;
      
      const safeId = String(id || "default").replace(/[^a-zA-Z0-9]/g, "_");
      const key = "__liquidApp_" + safeId;
      const appInstance = window[key];

      if (appInstance && typeof appInstance.dispose === "function") {
        appInstance.dispose();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [id, imageUrl, metalness, roughness, displacementScale, enableRain]);

  return (
    <div className={`liquid-canvas-container ${overlayMode ? 'overlay-mode' : ''} ${className}`} style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999, // High z-index to sit on top
      pointerEvents: 'none', // Allow clicks to pass through
      background: 'transparent'
    }}>
      <canvas 
        ref={canvasRef} 
        id={id} 
        className="liquid-canvas" 
        style={{ 
          background: 'transparent', 
          display: 'block', 
          width: '100%', 
          height: '100%' 
        }} 
      />
    </div>
  );
}