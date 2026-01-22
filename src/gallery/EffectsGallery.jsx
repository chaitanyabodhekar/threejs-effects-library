import { useState } from 'react';
import LiquidEffect01, { effectMeta as liquidMeta } from '../effects/LiquidEffect01';
import { Layers, Maximize2, Info } from 'lucide-react';

const effects = [
  { component: LiquidEffect01, meta: liquidMeta }
];

export default function EffectsGallery() {
  const [activeEffectIndex, setActiveEffectIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  const ActiveEffect = effects[activeEffectIndex].component;
  const activeMeta = effects[activeEffectIndex].meta;

  return (
    <div className="w-full h-screen bg-gray-950 text-white overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar / Gallery List */}
      <div className="w-full md:w-80 bg-gray-900 border-r border-gray-800 p-6 flex flex-col z-10 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Interaction Lib
          </h1>
          <p className="text-gray-400 text-sm mt-2">Curated visual effects</p>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {effects.map((effect, index) => (
            <div
              key={effect.meta.id}
              onClick={() => setActiveEffectIndex(index)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                activeEffectIndex === index
                  ? 'bg-gray-800 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-950 relative group">
                <img 
                  src={effect.meta.thumbnail} 
                  alt={effect.meta.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="font-medium text-gray-200">{effect.meta.name}</h3>
              <div className="flex gap-2 mt-2">
                {effect.meta.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500 flex items-center gap-2">
          <Layers className="w-3 h-3" />
          <span>{effects.length} Effect{effects.length !== 1 ? 's' : ''} Available</span>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative bg-black">
        <ActiveEffect className="w-full h-full" />
        
        {/* Overlay Info */}
        <div className={`absolute top-6 right-6 transition-all duration-500 ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-80 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{activeMeta.name}</h2>
              <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white">
                ×
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {activeMeta.description}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <code className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                &lt;{activeMeta.id} /&gt;
              </code>
            </div>
          </div>
        </div>

        {/* Toggle Info Button */}
        {!showInfo && (
          <button 
            onClick={() => setShowInfo(true)}
            className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}