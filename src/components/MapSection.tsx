import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { festivalHubs } from '../data';
import { MapPin, Navigation, Map, Globe, Info, Compass } from 'lucide-react';

export default function MapSection() {
  const [selectedHub, setSelectedHub] = useState<typeof festivalHubs[0]>(festivalHubs[0]);
  const [simulatedRouting, setSimulatedRouting] = useState(false);

  const triggerRoutingSim = () => {
    setSimulatedRouting(true);
    setTimeout(() => {
      setSimulatedRouting(false);
    }, 3000);
  };

  return (
    <section id="mapa" className="py-24 bg-black relative">
      <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-l-4 border-primary pl-4 md:pl-6">
          <p className="font-mono text-xs text-primary font-black uppercase tracking-widest flex items-center gap-1">
            <Compass size={14} className="animate-spin" style={{ animationDuration: '10s' }} /> MAPA E INTERACTIVIDAD
          </p>
          <h2 className="font-display font-black italic text-4xl md:text-6xl text-grunge-white uppercase tracking-tighter mt-1 leading-none">
            MEDELLÍN ES NUESTRO <span className="text-secondary">ESCENARIO</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-xl mt-3 leading-relaxed">
            Distrito X se toma la ciudad. Explora los hubs oficiales del festival distribuidos por los puntos más icónicos del valle de Aburrá.
          </p>
        </div>

        {/* Map and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Visual Vector Map representation (Brutalist Style) */}
          <div className="lg:col-span-7 bg-zinc-950 border-3 border-zinc-800 p-6 relative flex flex-col justify-between overflow-hidden min-h-[420px] rounded-none group">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 font-mono text-[9px] bg-black border border-zinc-800 text-zinc-400 px-2 py-1">
              <Globe size={11} className="text-primary animate-pulse" /> GRID DE COORDENADAS MEDELLÍN
            </div>

            {/* Grid gridlines background to feel highly blueprint/retro */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Simulated River flowing diagonally across Medellín */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 450 Q 200 300 400 200 T 800 50" fill="none" stroke="#ff571a" strokeWidth="4" strokeDasharray="8,6" />
              <text x="250" y="240" fill="#fdd000" fontSize="10" fontFamily="monospace" letterSpacing="2" className="rotate-[-24deg] font-bold">RÍO MEDELLÍN</text>
            </svg>

            {/* Interactive Pins */}
            <div className="absolute inset-0">
              {festivalHubs.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <motion.button
                    key={hub.id}
                    onClick={() => {
                      setSelectedHub(hub);
                    }}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group"
                    whileHover={{ scale: 1.15 }}
                  >
                    {/* Pulsing indicator behind the pin */}
                    {isSelected && (
                      <span className="absolute -top-1 block h-8 w-8 rounded-full bg-secondary/20 border-2 border-secondary/40 animate-ping" />
                    )}

                    {/* Pin Box */}
                    <div className={`p-2 transition-all ${
                      isSelected 
                        ? 'bg-secondary text-black brutalist-border-yellow font-black' 
                        : 'bg-black text-grunge-white border border-zinc-800 hover:border-primary'
                    }`}>
                      <MapPin size={16} className={isSelected ? 'animate-bounce' : 'text-primary'} />
                    </div>

                    {/* Miniature label visible on hover or if selected */}
                    <span className={`mt-1 font-mono text-[9px] px-1.5 py-0.5 whitespace-nowrap uppercase tracking-wider ${
                      isSelected 
                        ? 'bg-secondary text-black font-extrabold' 
                        : 'bg-black/90 text-zinc-400 border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity'
                    }`}>
                      {hub.name.split(' ')[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Graphic Map scale/legend indicator */}
            <div className="relative z-10 mt-auto pt-16 flex items-center justify-between font-mono text-[9px] text-zinc-500">
              <div className="flex items-center gap-1.5">
                <div className="w-12 h-1 bg-zinc-800 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-primary"></div>
                </div>
                <span>ESC. 1:12.500 METROS</span>
              </div>
              <span>CO COORD: 6.2442° N, 75.5812° W</span>
            </div>
          </div>

          {/* Location details card */}
          <div className="lg:col-span-5 bg-surface-dark border-3 border-primary/40 p-6 md:p-8 rounded-none flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 warning-strip h-2 w-1/4"></div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2.5 bg-black border border-primary/20 text-primary">
                  <MapPin size={18} />
                </span>
                <div>
                  <span className="block font-mono text-[10px] text-zinc-500 uppercase">VENUE DETALLES</span>
                  <span className="block font-mono text-[11px] text-secondary font-black">ACTIVO EN DÍAS 1, 2 Y 3</span>
                </div>
              </div>

              <h3 className="font-display font-black italic text-2xl md:text-3xl text-grunge-white uppercase leading-none mb-3">
                {selectedHub.name}
              </h3>

              <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed bg-black/40 p-4 border-l-2 border-primary mb-6">
                {selectedHub.description}
              </p>

              {/* Fake coordinate display */}
              <div className="grid grid-cols-2 gap-3.5 bg-zinc-950 p-3.5 border border-zinc-900 font-mono text-[10px]">
                <div>
                  <span className="block text-zinc-600">LATITUD:</span>
                  <span className="text-secondary font-bold">6.24419° N</span>
                </div>
                <div>
                  <span className="block text-zinc-600">LONGITUD:</span>
                  <span className="text-secondary font-bold">75.58123° W</span>
                </div>
                <div>
                  <span className="block text-zinc-600">RECOMENDACIÓN:</span>
                  <span className="text-grunge-white">Usar Metro de Medellín</span>
                </div>
                <div>
                  <span className="block text-zinc-600">ESTADO VENUE:</span>
                  <span className="text-green-500 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping"></span>
                    DISPONIBLE
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-900">
              <button 
                onClick={triggerRoutingSim}
                disabled={simulatedRouting}
                className="w-full flex items-center justify-center gap-1.5 bg-secondary text-black hover:bg-secondary-dim px-4 py-3 font-display font-black text-xs uppercase tracking-widest transition-all rounded-none"
              >
                <Navigation size={14} className={simulatedRouting ? 'animate-spin' : ''} />
                {simulatedRouting ? 'CALCULANDO RUTA RECOMENDADA...' : 'TRAZAR RUTA EN EL MAPA'}
              </button>

              <AnimatePresence>
                {simulatedRouting && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-mono text-[9px] text-secondary mt-2.5 text-center"
                  >
                    ✔ Ruta calculada por Comuna 13 hacia el {selectedHub.name}. Recomendamos bajarse en Estación Estadio del Metro.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
