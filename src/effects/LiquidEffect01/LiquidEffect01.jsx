import { useEffect, useRef } from "react";
import { defaultConfig } from "./config";
import "./styles.css";

export default function LiquidEffect01({ 
  className = "", 
  imageUrl = defaultConfig.imageUrl,
  metalness = defaultConfig.metalness,
  roughness = defaultConfig.roughness,
  displacementScale = defaultConfig.displacementScale,
  enableRain = defaultConfig.enableRain
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Load the script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas-01');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('${imageUrl}');
        app.liquidPlane.material.metalness = ${metalness};
        app.liquidPlane.material.roughness = ${roughness};
        app.liquidPlane.uniforms.displacementScale.value = ${displacementScale};
        app.setRain(${enableRain});
        window.__liquidApp = app;
      }
    `;

    document.body.appendChild(script);

    return () => {
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [imageUrl, metalness, roughness, displacementScale, enableRain]);

  return (
    <div className={`liquid-canvas-container ${className}`}>
      <canvas ref={canvasRef} id="liquid-canvas-01" className="liquid-canvas" />
    </div>
  );
}