import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Users, Volume2, Maximize, Play, Pause, RefreshCw } from 'lucide-react';

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  isUser?: boolean;
}

const PAISA_COMMENTS = [
  "¡Qué chimba ese truco parce! 🔥",
  "Uff Mateo volando en el aire, qué locura!! 🚲",
  "Medellín represent, el talento de las comunas está a otro nivel",
  "¿Alguien más vio ese tailwhip? Demasiado limpio",
  "¡El rap de MC Carpediem me paró los pelos! Qué rimas",
  "Esas motos stunt están dementes 🏍️💨",
  "Santi Glock dándole durísimo al riel de concreto",
  "¿Cuándo es la final de breakdance? ¡Qué energía!",
  "La Comuna 13 brillando como siempre",
  "Qué berraquera de evento, esto es lo que necesita la ciudad 🇨🇴",
  "¡Ufff ese graffiti quedó una re-chimba!",
  "Quiero comprar la sudadera de La Comuna, ¡el diseño está brutal!",
  "¡Se prendió esto parceros! Distrito X rompiendo todo"
];

const CHAT_USERS = [
  "paisa_extremo", "comuna_13_skater", "bgirl_antioquia", "pipe_bmx", "stunt_medallo", 
  "la_flaca_street", "milo_graffiti", "rap_medellin_99", "andres_skate", "juancho_paisa"
];

export default function StreamingModal({ isOpen, onClose }: StreamingModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'skater_boy_99', text: 'Esperando el inicio de la transmisión en vivo! 🛹', time: '14:02' },
    { id: '2', user: 'b-girl-mari', text: '¡Qué energía la de Distrito X este año!', time: '14:03' },
    { id: '3', user: 'bmx_freak', text: '¿Ya empezó la transmisión del skate bowl?', time: '14:04' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [userName, setUserName] = useState('Anonimo_Medallo');
  const [viewerCount, setViewerCount] = useState(14240);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCam, setActiveCam] = useState<'CAM 1: SKATEPARK' | 'CAM 2: STAGE RAP' | 'CAM 3: STUNT MOTO'>('CAM 1: SKATEPARK');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate viewer count fluctuation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Simulate incoming live chat messages
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const randomUser = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)];
      const randomComment = PAISA_COMMENTS[Math.floor(Math.random() * PAISA_COMMENTS.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          user: randomUser,
          text: randomComment,
          time: timeStr
        }
      ].slice(-30)); // Keep last 30 messages
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      user: userName.trim() || 'Roster_Fan',
      text: inputVal.trim(),
      time: timeStr,
      isUser: true
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputVal('');

    // Simulated quick response from another viewer
    setTimeout(() => {
      const nowResp = new Date();
      const respTimeStr = `${String(nowResp.getHours()).padStart(2, '0')}:${String(nowResp.getMinutes()).padStart(2, '0')}`;
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          user: 'moderador_x',
          text: `¡Grande @${userName}! Bienvenido al chat oficial de Distrito X ⚡`,
          time: respTimeStr
        }
      ]);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-surface-dark border-3 border-primary flex flex-col md:flex-row h-[90vh] md:h-[80vh] text-grunge-white rounded-none overflow-hidden shadow-[0_0_30px_rgba(255,87,26,0.3)]">
        
        {/* Main Stream Area */}
        <div className="flex-1 flex flex-col bg-black relative border-b-2 md:border-b-0 md:border-r-2 border-primary/20">
          
          {/* Header of Video Feed */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 bg-primary text-black font-display font-black text-xs px-2.5 py-1 clip-dogear">
              <span className="animate-ping block h-2 w-2 rounded-full bg-black"></span>
              EN VIVO
            </span>
            <span className="bg-black/80 border border-zinc-700 text-grunge-white font-mono text-[11px] px-2.5 py-1 flex items-center gap-1">
              <Users size={12} className="text-secondary" />
              {viewerCount.toLocaleString()}
            </span>
            <span className="bg-black/80 border border-zinc-700 text-secondary font-mono text-[11px] px-2.5 py-1 font-bold">
              {activeCam}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-black/80 border border-zinc-700 text-grunge-white hover:text-primary hover:border-primary transition-colors"
            aria-label="Cerrar reproductor"
          >
            <X size={20} />
          </button>

          {/* Interactive Screen simulation */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-zinc-950 halftone-overlay">
            
            {/* Visual Glitch effects depending on Cam */}
            {isPlaying ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none">
                {/* Simulated high-action neon graphic loops */}
                <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-color-dodge transition-all duration-700" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800')` }}
                />
                
                {/* Animated graphic indicators */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="relative z-10 p-6 max-w-sm border-2 border-dashed border-secondary/40 bg-black/65 backdrop-blur-sm"
                >
                  <p className="font-mono text-xs text-secondary mb-1">STREAMEANDO DESDE MEDELLÍN, COLOMBIA</p>
                  <h3 className="font-display font-black text-3xl italic tracking-tighter text-grunge-white mb-3">
                    DISTRITO X <span className="text-primary">FESTIVAL</span>
                  </h3>
                  <div className="flex justify-center gap-1.5 mb-2">
                    {[1,2,3,4,5,6,7].map((b) => (
                      <motion.div 
                        key={b}
                        animate={{ height: [12, Math.random() * 32 + 10, 12] }}
                        transition={{ repeat: Infinity, duration: 0.5 + (b * 0.1) }}
                        className="w-1 bg-primary"
                      />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-zinc-400">Audio estéreo HD activado. Las señales de video se retransmiten en tiempo real de los escenarios oficiales.</p>
                </motion.div>

                {/* Grid Overlay scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="p-4 rounded-full border-2 border-primary text-primary animate-pulse">
                  <Pause size={32} />
                </div>
                <p className="font-display font-bold text-lg tracking-wide">SEÑAL EN PAUSA</p>
                <p className="font-sans text-xs text-zinc-500">Haz clic en reproducir para reanudar la señal del festival</p>
              </div>
            )}

            {/* Simulated subtitle tickers */}
            {isPlaying && (
              <div className="absolute bottom-16 left-4 right-4 bg-black/85 border border-zinc-800 p-2.5 font-mono text-[11px] text-zinc-300">
                <span className="text-secondary font-bold">INFO DE ESCENARIO:</span> Competencia oficial de trucos Skate / BMX en directo en las rampas principales de Medellín.
              </div>
            )}
          </div>

          {/* Video Controls Bar */}
          <div className="bg-surface-dark px-4 py-3 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 text-grunge-white hover:text-primary transition-colors"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <div className="flex items-center gap-2">
                <Volume2 size={16} className="text-zinc-400" />
                <div className="w-16 h-1 bg-zinc-800 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-[80%] bg-primary"></div>
                </div>
              </div>
            </div>

            {/* Camera Selectors */}
            <div className="hidden sm:flex items-center gap-1.5">
              {(['CAM 1: SKATEPARK', 'CAM 2: STAGE RAP', 'CAM 3: STUNT MOTO'] as const).map((cam) => (
                <button
                  key={cam}
                  onClick={() => setActiveCam(cam)}
                  className={`px-2 py-1 font-mono text-[10px] border transition-colors ${
                    activeCam === cam 
                      ? 'border-primary bg-primary/10 text-primary font-bold' 
                      : 'border-zinc-800 text-zinc-400 hover:text-grunge-white hover:border-zinc-700'
                  }`}
                >
                  {cam.split(': ')[1]}
                </button>
              ))}
            </div>

            <div>
              <button className="p-1.5 text-zinc-400 hover:text-grunge-white transition-colors">
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat Panel */}
        <div className="w-full md:w-80 flex flex-col bg-surface-dark h-1/2 md:h-full">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <h4 className="font-display font-black text-xs tracking-wider uppercase">CHAT DEL FESTIVAL</h4>
            </div>
            <button 
              onClick={() => setMessages([])}
              className="text-zinc-500 hover:text-grunge-white p-1"
              title="Limpiar chat"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Username config */}
          <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950 flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-500">APODO:</span>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value.replace(/\s+/g, '_'))}
              placeholder="Escribe tu apodo..."
              maxLength={15}
              className="bg-transparent text-secondary font-mono text-[11px] focus:outline-none border-b border-dashed border-zinc-800 focus:border-secondary w-full"
            />
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`text-xs flex flex-col p-1.5 ${
                  msg.isUser ? 'bg-primary/5 border-l-2 border-primary pl-2' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-mono text-[11px] font-bold ${
                    msg.isUser ? 'text-primary' : 'text-secondary-dim'
                  }`}>
                    {msg.user}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">{msg.time}</span>
                </div>
                <p className="font-sans text-zinc-300 text-wrap break-words">{msg.text}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Comenta en paisa slang..."
              maxLength={100}
              className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-600 rounded-none font-sans"
            />
            <button 
              type="submit"
              className="p-2 bg-primary text-black hover:bg-primary-dim transition-colors flex items-center justify-center rounded-none"
              aria-label="Enviar"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
