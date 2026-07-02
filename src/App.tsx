import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, Radio, Award, Compass, Sparkles, ChevronRight, 
  HelpCircle, ShieldCheck, Mail, Briefcase, Zap, Trophy,
  Dumbbell, Mic, MessageSquare, ArrowRight, Star
} from 'lucide-react';

// Subcomponents
import Header from './components/Header';
import StreamingModal from './components/StreamingModal';
import RosterSection from './components/RosterSection';
import ScheduleSection from './components/ScheduleSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';

// Data
import { mentors } from './data';
import { Mentor } from './types';

export default function App() {
  const [isStreamingOpen, setIsStreamingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [countdown, setCountdown] = useState({ days: 108, hours: 14, minutes: 22, seconds: 45 });
  
  // Mouse spotlight and cursor states
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // Mentor Interaction State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [mentorAnswer, setMentorAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  // Mouse move spotlight listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.group') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'festival', 'protagonistas', 'mentores', 'mapa'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !userQuestion.trim()) return;

    setIsAnswering(true);
    setMentorAnswer('');

    // Simulate thinking, then render custom Paisa slang answer
    setTimeout(() => {
      let answer = '';
      if (selectedMentor.id === 'm1') {
        answer = `¡Qué onda parcero! Escuché tu inquietud. En Zona Urbana Records siempre estamos buscando oídos frescos y berraquera de la buena. Mi consejo principal: graba con lo que tengas a la mano, sube tus maquetas o pistas sin miedo que la calle misma te va puliendo el sonido. ¡No afloje un solo día!`;
      } else if (selectedMentor.id === 'm2') {
        answer = `¡Hola campeón! Qué alegría ver tu entusiasmo. El skate me enseñó que si te vas al suelo diez veces, te levantas once con el doble de berraquera. Te sugiero que grabes un videito corto de 1 minuto mostrando tus mejores trucos, súbelo con el tag de Distrito X y pégate a los entrenamientos en el Estadio. ¡A rodar con el alma!`;
      } else {
        answer = `¡Buenas artista! Qué chimba de pregunta. El grafiti es el grito de las fachadas y relata lo que vive la comuna. No busques perfección técnica al principio, busca contar la historia de tu cuadra. Consigue buenos aerosoles, cuida el espacio público con respeto y raye con todo el corazón. ¡Nos vemos pintando las calles!`;
      }
      setMentorAnswer(answer);
      setIsAnswering(false);
    }, 1500);
  };

  return (
    <div className="bg-background-black text-grunge-white min-h-screen font-sans antialiased selection:bg-primary selection:text-black relative">
      
      {/* Dynamic Cursor Spotlight Background Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 87, 26, 0.12), transparent 80%)`
        }}
      />
      
      {/* Glowing ring cursor follower */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 w-8 h-8 rounded-full border-2 mix-blend-screen z-50 hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 87, 26, 0.15)' : 'rgba(255, 87, 26, 0)',
          borderColor: isHovered ? '#fdd000' : '#ff571a',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 w-2.5 h-2.5 rounded-full bg-secondary mix-blend-screen z-50 hidden md:block"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.2 }}
      />

      {/* Halftone fixed background layer to feel raw and printed */}
      <div className="fixed inset-0 halftone-overlay pointer-events-none opacity-5 z-40"></div>

      {/* Navigation Header */}
      <Header 
        onOpenStreaming={() => setIsStreamingOpen(true)}
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-black border-b-2 border-primary/20">
        
        {/* Background Visual Graphic with opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 filter grayscale hover:grayscale-0 transition-all duration-1000"
          style={{ backgroundImage: `url('/src/assets/images/distrito_x_hero_1782829817661.jpg')` }}
        />
        
        {/* Subtle orange neon glow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/90"></div>
        <div className="absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="font-mono text-xs bg-secondary text-black px-3 py-1 font-black uppercase tracking-widest clip-dogear">
              FESTIVAL URBANO 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black italic text-6xl sm:text-8xl md:text-[110px] text-grunge-white tracking-tighter uppercase leading-none text-shadow-lg"
          >
            DISTRITO <span className="text-primary italic">X</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-black/80 brutalist-border px-6 py-2.5 my-6 backdrop-blur-sm relative"
          >
            <div className="absolute top-0 left-0 warning-strip h-1 w-12"></div>
            <p className="font-display font-black text-xl md:text-3xl tracking-wide uppercase italic text-grunge-white leading-none">
              MEDELLÍN ES UNA CHIMBA
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mb-10 leading-relaxed"
          >
            Deportes de calle, motores, ruedas, fuerza, rimas, arte, moda y gastronomía. Del asfalto al streaming, Medellín se une en una experiencia única.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => setIsStreamingOpen(true)}
              className="px-8 py-4 bg-primary text-black hover:bg-primary-dim font-display font-black text-sm tracking-widest uppercase transition-all rounded-none flex items-center justify-center gap-2.5 shadow-[5px_5px_0px_#fdd000]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              STREAMING EN DIRECTO
            </button>

            <button
              onClick={() => handleScrollToSection('festival')}
              className="px-8 py-4 bg-black border-2 border-grunge-white text-grunge-white hover:bg-grunge-white hover:text-black font-display font-black text-sm tracking-widest uppercase transition-all rounded-none"
            >
              EXPLORAR AGENDA
            </button>
          </motion.div>

          {/* Real-time Countdown Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-zinc-950/90 border border-zinc-800 p-4 md:p-6 backdrop-blur-md max-w-2xl w-full"
          >
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-1">
              <Zap size={11} className="text-secondary" /> TIEMPO PARA LAS FINALES OFICIALES EN MEDELLÍN
            </p>
            
            <div className="grid grid-cols-4 gap-2 md:gap-4 font-mono">
              {[
                { label: 'DÍAS', val: countdown.days },
                { label: 'HORAS', val: countdown.hours },
                { label: 'MINUTOS', val: countdown.minutes },
                { label: 'SEGUNDOS', val: countdown.seconds },
              ].map((c) => (
                <div key={c.label} className="bg-black/80 border border-zinc-900 px-2 py-3.5 flex flex-col items-center">
                  <span className="font-display font-black text-xl md:text-3xl text-secondary">{String(c.val).padStart(2, '0')}</span>
                  <span className="text-[9px] text-zinc-600 font-bold mt-1 tracking-wider">{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Industrial slanted accent border under Hero */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      </section>

      {/* ¿QUÉ ES DISTRITO X? Section */}
      <section className="py-24 bg-zinc-950 relative border-b-2 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column statement */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-primary font-black uppercase tracking-widest">⚡ INTRODUCCIÓN</span>
              
              <h2 className="font-display font-black italic text-4xl md:text-5xl text-grunge-white uppercase tracking-tighter leading-tight">
                ¿QUÉ ES <br />
                <span className="text-primary italic">DISTRITO X?</span>
              </h2>

              <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed">
                Distrito X es el festival urbano más poderoso de Medellín. Un evento que reúne las expresiones deportivas y artísticas más indomables del valle de Aburrá. Una vitrina para que los talentos de las comunas conquisten el mapa nacional.
              </p>

              <div className="bg-surface-dark border-2 border-primary/20 p-5 rounded-none relative">
                <div className="absolute top-0 left-0 warning-strip h-1 w-1/4"></div>
                <p className="font-display font-bold text-sm tracking-wide text-grunge-white uppercase leading-normal">
                  DEPORTES DE CALLE, MOTORES, RUEDAS, FUERZA, ARTE, MÚSICA, MODA Y GASTRONOMÍA EN UNA EXPERIENCIA ÚNICA.
                </p>
              </div>

              <p className="font-display font-black italic text-sm md:text-base text-secondary uppercase tracking-wider">
                AHORA LLEGA UN ESPACIO DONDE TODOS SE ENCUENTRAN.
              </p>
            </div>

            {/* Right Column Categories grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: 'DEPORTES EXTREMOS', 
                  desc: 'BMX, Skateboarding, Roller y parkour en rampas diseñadas al límite de la física.',
                  icon: <Trophy className="text-primary" size={24} />
                },
                { 
                  title: 'FUERZA Y ALTO RENDIMIENTO', 
                  desc: 'Calistenia, powerlifting y street-workouts que demuestran la disciplina del barrio.',
                  icon: <Dumbbell className="text-secondary" size={24} />
                },
                { 
                  title: 'CULTURA URBANA', 
                  desc: 'Batallas de freestyle rap, grafitis gigantes en vivo y breakdance de exportación.',
                  icon: <Mic className="text-primary" size={24} />
                },
                { 
                  title: 'MOTORES Y ADRENALINA', 
                  desc: 'Stunt riding, drift shows y exhibición de vehículos modificados en circuito cerrado.',
                  icon: <Zap className="text-secondary" size={24} />
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-dark border border-zinc-900 hover:border-primary/40 p-5 flex flex-col justify-between rounded-none group transition-all duration-300">
                  <div className="mb-4 p-2 bg-black/60 border border-zinc-900 w-12 h-12 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-black italic text-sm text-grunge-white uppercase tracking-wider group-hover:text-secondary transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11px] text-zinc-500 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Accent slash banner bar */}
          <div className="mt-20 warning-strip py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-display font-black italic text-sm md:text-base text-black uppercase tracking-wider">
              ¿ESTÁS LISTO PARA SER PARTE DE LA HISTORIA?
            </p>
            <div className="flex gap-2">
              {[1,2,3].map(i => <div key={i} className="h-2 w-8 bg-black"></div>)}
            </div>
          </div>

        </div>
      </section>

      {/* Schedule Timetable Section */}
      <ScheduleSection />

      {/* Roster Section */}
      <RosterSection />

      {/* Mentores X Section */}
      <section id="mentores" className="py-24 bg-asphalt relative border-t-2 border-b-2 border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Visual poster column on the left */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative border-4 border-primary p-2 bg-black self-center max-w-[340px] shadow-[-10px_10px_0px_#fdd000] group overflow-hidden">
                <div className="absolute top-0 left-0 warning-strip h-8 w-24 z-10 -rotate-12 -translate-x-6 -translate-y-2"></div>
                
                <img 
                  src="/src/assets/images/distrito_x_mentores_1782829847872.jpg"
                  alt="Poster de Mentores de Distrito X" 
                  className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300 object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <div className="bg-primary text-black p-3 mt-2 text-center font-display font-black italic uppercase text-xs tracking-wider">
                  LOS GRANDES IMPULSAN A LOS PRÓXIMOS
                </div>
              </div>
            </div>

            {/* Content text column on the right */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-black uppercase tracking-widest flex items-center gap-1 mb-2">
                  ⚡ MENTORES X
                </span>

                <h2 className="font-display font-black italic text-4xl md:text-6xl text-grunge-white uppercase tracking-tighter leading-none mb-3">
                  LOS GRANDES <br />
                  <span className="text-secondary">IMPULSAN A LOS PRÓXIMOS</span>
                </h2>

                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6">
                  Un formato único donde <strong className="text-grunge-white">EMPRESARIOS, DEPORTISTAS Y ARTISTAS</strong> reconocidos con trayectoria internacional se comprometen a AYUDAR A DESCUBRIR e IMPULSAR nuevos talentos de Medellín.
                </p>

                {/* Bullets box */}
                <div className="bg-black/60 border border-zinc-900 p-5 rounded-none space-y-3 font-mono text-xs text-grunge-white mb-8">
                  {[
                    'AQUÍ NO SOLO SE COMPITE.',
                    'AQUÍ SE APRENDE.',
                    'AQUÍ SE CONECTA.',
                    'AQUÍ SE CREAN OPORTUNIDADES.'
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="p-1 bg-secondary text-black text-[9px] font-black">✔</span>
                      <span className="font-bold tracking-wide">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Mentorship Playboard / Question Box */}
              <div className="bg-surface-dark border-2 border-secondary/40 p-5 relative">
                <div className="absolute top-0 right-0 warning-strip-yellow h-1 w-1/3"></div>
                
                <h4 className="font-display font-black italic text-base text-secondary uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <MessageSquare size={16} /> CONSULTA DIRECTA CON EL MENTOR
                </h4>
                <p className="font-sans text-xs text-zinc-400 mb-4">
                  Elige uno de nuestros mentores oficiales y pregúntale sobre cómo despegar tu talento en la calle. ¡Recibe una respuesta inmediata en jerga paisa!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                  {mentors.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMentor(m);
                        setMentorAnswer('');
                      }}
                      className={`p-2 border font-mono text-[10px] text-left transition-all ${
                        selectedMentor?.id === m.id
                          ? 'border-secondary bg-secondary/10 text-secondary font-black'
                          : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-grunge-white'
                      }`}
                    >
                      <span className="block font-bold">{m.name.split(' ')[0]}</span>
                      <span className="block text-[8px] opacity-70 truncate">{m.role.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {selectedMentor && (
                  <form onSubmit={handleAskMentor} className="space-y-3.5 mt-3 animate-fadeIn">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        placeholder={`Pregúntale a ${selectedMentor.name.split(' ')[0]}... (ej: ¿cómo conseguir apoyo?)`}
                        className="flex-1 bg-black border border-zinc-800 text-xs px-3 py-2 text-grunge-white focus:outline-none focus:border-secondary placeholder-zinc-700"
                      />
                      <button 
                        type="submit"
                        disabled={isAnswering}
                        className="bg-secondary text-black hover:bg-secondary-dim font-display font-black text-xs px-4 uppercase tracking-widest transition-colors whitespace-nowrap"
                      >
                        {isAnswering ? 'PENSANDO...' : 'PREGUNTAR'}
                      </button>
                    </div>

                    {/* Response display */}
                    <AnimatePresence>
                      {mentorAnswer && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0 }}
                          className="bg-black/90 p-4 border border-zinc-800/80 font-sans text-xs relative"
                        >
                          <p className="font-mono text-[9px] text-secondary font-black uppercase mb-1">
                            CONSEJO DE {selectedMentor.name.toUpperCase()}:
                          </p>
                          <p className="text-zinc-300 italic leading-relaxed">
                            "{mentorAnswer}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}
              </div>

            </div>

          </div>

          {/* Yellow Quote Block */}
          <div className="mt-16 bg-secondary text-black p-6 font-display font-black italic text-center text-xl sm:text-2xl uppercase tracking-wider relative overflow-hidden">
            <div className="absolute top-0 right-0 warning-strip-yellow h-full w-32 opacity-15 rotate-12 translate-x-12"></div>
            PORQUE EL TALENTO CRECE CUANDO ALGUIEN CREE EN ÉL.
          </div>

        </div>
      </section>

      {/* ¿POR QUÉ LAS MARCAS QUIEREN ESTAR AQUÍ? Section */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-secondary font-black uppercase tracking-widest flex items-center justify-center gap-1 mb-2">
              <Briefcase size={14} /> ALIANZAS COMERCIALES
            </span>
            <h2 className="font-display font-black italic text-4xl md:text-5xl text-grunge-white uppercase tracking-tighter leading-none mb-4">
              ¿POR QUÉ LAS MARCAS <br />
              <span className="text-primary italic">QUIEREN ESTAR AQUÍ? ⚡</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed">
              Porque Distrito X reúne todo un ecosistema urbano real y las marcas buscan talentos auténticos que validen y legitimen su presencia en la calle.
            </p>
          </div>

          {/* Badge grid */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
            {[
              { label: 'DEPORTISTA', desc: 'Atletas con millones de visualizaciones' },
              { label: 'ARTISTA', desc: 'Músicos y pintores que marcan tendencia' },
              { label: 'AMANTES DE LOS MOTORES', desc: 'Pilotos stunt y tuning masivo' },
              { label: 'MODA URBANA', desc: 'Diseñadores independientes de Comuna' },
              { label: 'EMPRENDEDOR', desc: 'Gastronomía y marcas de asfalto' },
              { label: 'INNOVADORES', desc: 'Tecnología para creadores digitales' }
            ].map((badge, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950 border border-zinc-900 px-5 py-3 relative group text-center min-w-[140px] flex-1 max-w-[200px]"
              >
                <span className="font-mono text-xs font-black text-secondary group-hover:text-primary transition-colors block">
                  {badge.label}
                </span>
                <span className="font-sans text-[8px] text-zinc-600 block mt-0.5">{badge.desc}</span>
              </div>
            ))}
          </div>

          {/* Dynamic box overlay layout */}
          <div className="max-w-4xl mx-auto bg-surface-dark border-3 border-primary/40 p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 warning-strip h-1.5 w-1/4"></div>

            <p className="font-display font-bold text-center text-sm md:text-base text-grunge-white uppercase leading-normal max-w-2xl mx-auto mb-8">
              Un espacio para conectar con miles de personas que viven la cultura urbana como un estilo de vida en Medellín.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-grunge-white">
              {[
                { title: 'ES CONEXIÓN REAL.', subtitle: 'Sin filtros corporativos' },
                { title: 'ES COMUNIDAD.', subtitle: 'Construida desde el barrio' },
                { title: 'ES EXPERIENCIA.', subtitle: 'Adrenalina pura en vivo' }
              ].map((point, idx) => (
                <div key={idx} className="bg-black/50 border border-zinc-900 p-4 text-center">
                  <span className="block font-black text-secondary text-sm mb-1">{point.title}</span>
                  <span className="block text-[9px] text-zinc-500 uppercase">{point.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Accent callout box */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-primary text-black px-6 py-4 font-display font-black italic text-lg sm:text-2xl uppercase tracking-tighter rotate-1">
              LA CIUDAD ESTÁ LISTA. LA CALLE ESTÁ LISTA. ¿Y TÚ?
            </div>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* Footer copyright */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Simulated Video Streaming Modal */}
      <StreamingModal 
        isOpen={isStreamingOpen}
        onClose={() => setIsStreamingOpen(false)}
      />

    </div>
  );
}
