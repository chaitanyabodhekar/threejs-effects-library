import EffectsGallery from './gallery/EffectsGallery';
import LiquidEffect01 from './effects/LiquidEffect01';

function App() {
  return (
    <>
      {/* Main App UI (Underlying Layer) */}
      <EffectsGallery />

      {/* Fixed Fullscreen Overlay (Rendered ON TOP) */}
      <div id="liquid-overlay" style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent'
      }}> 
        <LiquidEffect01 overlayMode={true} /> 
      </div>
    </>
  );
}

export default App;