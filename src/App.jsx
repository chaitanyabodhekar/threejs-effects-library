import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LiquidEffect01 from './effects/LiquidEffect01/LiquidEffect01';
import { ChevronLeft, Info } from 'lucide-react';
import EffectsGallery from './gallery/EffectsGallery';

// Simple Effect Viewer Page
function EffectPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#0b0f1a] overflow-hidden">
      {/* Background (can be website background or specific to effect) */}
      <div className="absolute inset-0 bg-[#0b0f1a] z-0" />

      {/* The Liquid Effect as Transparent Overlay */}
      <LiquidEffect01 overlayMode={true} className="fixed inset-0 z-10 pointer-events-none" />

      {/* UI Layer (Above Effect) */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="pointer-events-auto absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-[#00ffff] transition-colors group"
        >
          <div className="p-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md group-hover:border-[#00ffff]/50">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-mono tracking-widest uppercase">Back to Gallery</span>
        </button>

        {/* Info Panel */}
        <div className="pointer-events-auto absolute bottom-8 left-8 max-w-md">
           <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter mix-blend-difference">Liquid Distortion</h1>
           <p className="text-white/60 text-sm leading-relaxed max-w-xs">
             A WebGL-based liquid distortion effect using Three.js. 
             Move your mouse to create ripples.
           </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EffectsGallery />} />
        <Route path="/effect/liquid" element={<EffectPage />} />
      </Routes>
    </Router>
  );
}
