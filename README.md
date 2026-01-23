# Interaction Effects Library

A curated collection of modern, reusable React interaction effects, built for showcasing creative web animations.

## Project Structure

```
src/
  effects/           # Reusable effect components
    LiquidEffect01/  # Individual effect folder
      LiquidEffect01.jsx
      styles.css
      config.js
      index.js
  gallery/           # Gallery UI components
    EffectsGallery.jsx
  App.jsx            # Main entry point (Mounts UI + Overlay)
  main.jsx           # React root
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/interaction-effects-library.git
   cd interaction-effects-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Using Effects as Overlay

This project implements a **website-only transparent overlay** that floats above your UI.

### Usage in React

To add the liquid effect overlay to your React app:

1. Copy the `src/effects/LiquidEffect01` folder to your project.
2. Import `LiquidEffect01` in your root component (e.g., `App.jsx`).
3. Render it inside a fixed container **after** your main content:

```jsx
import LiquidEffect01 from './effects/LiquidEffect01';

function App() {
  return (
    <>
      {/* Your App Content */}
      <YourMainContent />

      {/* Overlay Container (Must be last to sit on top) */}
      <div id="liquid-overlay" style={{ 
        position: "fixed", 
        inset: 0, 
        width: "100vw", 
        height: "100vh", 
        zIndex: 99999, 
        pointerEvents: "none", 
        background: "transparent" 
      }}> 
        <LiquidEffect01 overlayMode={true} /> 
      </div>
    </>
  );
}
```

### Configuration

You can customize the effect by passing props:

```jsx
<LiquidEffect01 
  overlayMode={true}
  metalness={0.9}
  roughness={0.1}
  enableRain={true}
/>
```

## Deployment

The project is built with Vite and can be easily deployed to Vercel, Netlify, or GitHub Pages.

To build for production:
```bash
npm run build
```

The output will be in the `dist` directory.

## License

MIT