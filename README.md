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
  App.jsx            # Main entry point
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

## Adding New Effects

To add a new effect to the library:

1. Create a new folder in `src/effects/` (e.g., `NewEffect02`).
2. Create your component files:
   - `NewEffect02.jsx`: The main React component.
   - `styles.css`: Component-specific styles.
   - `config.js`: Metadata (id, name, description, thumbnail) and default props.
   - `index.js`: Exports the component and metadata.
3. Import the new effect in `src/gallery/EffectsGallery.jsx` and add it to the `effects` array:
   ```javascript
   import NewEffect02, { effectMeta as newMeta } from '../effects/NewEffect02';

   const effects = [
     { component: LiquidEffect01, meta: liquidMeta },
     { component: NewEffect02, meta: newMeta }
   ];
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
