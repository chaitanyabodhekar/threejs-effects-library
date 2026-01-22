import { useState } from 'react';
import LiquidEffect01, { effectMeta as liquidMeta } from '../effects/LiquidEffect01';
import { Layers, Maximize2, Info } from 'lucide-react';

const effects = [
  { component: LiquidEffect01, meta: liquidMeta }
];

export default function EffectsGallery() {
  const [activeEffectIndex, setActiveEffectIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [showMenu, setShowMenu] = useState(true);

  const ActiveEffect = effects[activeEffectIndex].component;
  const activeMeta = effects[activeEffectIndex].meta;

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans selection:bg-[#00ffff] selection:text-black">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <ActiveEffect className="w-full h-full" />
      </div>

      {/* Main UI Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-6 md:p-12">
        
        {/* Header */}
        <header className="pointer-events-auto flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#00ffff] mix-blend-difference">
              Studio.C Effects Lab
            </h1>
            <p className="text-white/60 text-xs md:text-sm tracking-widest uppercase mt-2 font-mono">
              Creative Development Portfolio
            </p>
          </div>
          
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 text-[#00ffff] border border-[#00ffff]/20 rounded-full backdrop-blur-sm"
          >
            <Layers className="w-5 h-5" />
          </button>
        </header>

        {/* Floating Sidebar (Desktop) / Menu (Mobile) */}
        <div className={`
          pointer-events-auto 
          fixed top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-white/5 p-8
          transform transition-transform duration-500 ease-out z-50
          ${showMenu ? 'translate-x-0' : 'translate-x-full'}
          md:relative md:transform-none md:w-80 md:h-auto md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:block
          hidden
        `}>
           {/* This logic needs to be cleaner. Let's separate the overlay panel logic. */}
        </div>
      </div>
      
      {/* Sidebar Overlay for Navigation */}
      <div className={`
        pointer-events-auto fixed left-0 top-0 h-full w-full md:w-96 bg-black/90 backdrop-blur-2xl border-r border-white/5 p-8 md:p-12
        transform transition-transform duration-500 ease-[0.22, 1, 0.36, 1] z-40 flex flex-col
        ${showMenu ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-1 flex flex-col">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tighter text-[#00ffff]">
              Studio.C
            </h1>
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mt-2">
              Interactive Experiments
            </p>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Gallery Index</h3>
            {effects.map((effect, index) => (
              <div
                key={effect.meta.id}
                onClick={() => {
                  setActiveEffectIndex(index);
                  if (window.innerWidth < 768) setShowMenu(false);
                }}
                className={`group relative p-4 cursor-pointer transition-all duration-300 border-l-2 ${
                  activeEffectIndex === index
                    ? 'border-[#00ffff] bg-white/5'
                    : 'border-transparent hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-sm tracking-wide transition-colors ${
                    activeEffectIndex === index ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {effect.meta.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/20 group-hover:text-[#00ffff] opacity-0 group-hover:opacity-100 transition-all">
                    0{index + 1}
                  </span>
                </div>
                {activeEffectIndex === index && (
                   <p className="text-xs text-gray-500 mt-2 font-light line-clamp-2">
                     {effect.meta.description}
                   </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-white/30 font-mono">
            <span>v1.0.0</span>
            <div className="flex items-center gap-2">
              <Layers className="w-3 h-3" />
              <span>{effects.length} ITEMS</span>
            </div>
          </div>
        </div>
        
        {/* Toggle Button placed on the edge if closed? No, let's have a separate toggle. */}
      </div>

      {/* Menu Toggle (Visible when menu is closed) */}
      <button 
        onClick={() => setShowMenu(!showMenu)}
        className={`pointer-events-auto fixed top-8 left-8 z-50 p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-white transition-all duration-300 hover:border-[#00ffff]/50 hover:text-[#00ffff] ${showMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Layers className="w-5 h-5" />
      </button>

      {/* Close Menu Button (Visible when menu is open) */}
      <button 
        onClick={() => setShowMenu(false)}
        className={`pointer-events-auto fixed top-8 left-[21rem] md:left-[21rem] z-50 p-2 text-white/50 hover:text-white transition-all duration-500 ${showMenu ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none -translate-x-10'}`}
      >
         <span className="sr-only">Close</span>
         {/* Simple X icon or similar */}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* Info Overlay (Bottom Right) */}
      <div className="pointer-events-auto fixed bottom-8 right-8 z-40 max-w-sm w-full">
         <div className={`transition-all duration-500 transform ${showInfo ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-none border-l-2 border-l-[#00ffff]">
              <div className="flex justify-between items-start mb-2">
                 <h2 className="text-lg font-bold text-white tracking-wide">{activeMeta.name}</h2>
                 <button onClick={() => setShowInfo(false)} className="text-white/30 hover:text-white transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 </button>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {activeMeta.description}
              </p>
              <div className="mt-4 flex gap-2">
                 {activeMeta.tags.map(tag => (
                   <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-[#00ffff]/80 uppercase tracking-wider">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>
         </div>
         
         {!showInfo && (
           <button 
             onClick={() => setShowInfo(true)}
             className="absolute bottom-0 right-0 p-3 bg-black/50 backdrop-blur-md border border-white/10 text-[#00ffff] hover:bg-white/10 transition-all"
           >
             <Info className="w-5 h-5" />
           </button>
         )}
      </div>

    </div>
  );
}