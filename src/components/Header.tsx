import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Radio, UserPlus } from 'lucide-react';

interface HeaderProps {
  onOpenStreaming: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onOpenStreaming, onScrollToSection, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'FESTIVAL', id: 'festival' },
    { label: 'PROTAGONISTAS', id: 'protagonistas' },
    { label: 'MENTORES', id: 'mentores' },
    { label: 'MAPA', id: 'mapa' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 border-b-2 border-primary/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="cursor-pointer flex items-center gap-2 group"
          id="header-logo"
        >
          <span className="font-display font-black text-2xl md:text-3xl italic tracking-tighter text-grunge-white group-hover:text-primary transition-colors">
            DISTRITO <span className="text-primary group-hover:text-secondary">X</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] bg-secondary text-black px-1.5 py-0.5 font-bold uppercase tracking-widest clip-dogear">
            2026
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 relative py-2 ${
                activeSection === item.id 
                  ? 'text-secondary font-black' 
                  : 'text-grunge-white hover:text-primary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenStreaming}
            className="flex items-center gap-2 bg-black border-2 border-primary text-grunge-white hover:bg-primary hover:text-black hover:border-primary px-4 py-2 font-display font-extrabold text-xs tracking-wider uppercase transition-all duration-150 rounded-none relative overflow-hidden group"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-primary group-hover:bg-transparent"></span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Radio size={14} className="group-hover:rotate-12 transition-transform" />
            STREAMING
          </button>

          <button
            onClick={() => handleNavClick('registro')}
            className="flex items-center gap-1.5 bg-secondary text-black hover:bg-secondary-dim px-4 py-2 font-display font-extrabold text-xs tracking-wider uppercase transition-all duration-150 rounded-none border-2 border-secondary"
          >
            <UserPlus size={14} />
            ÚNETE AL ROSTER
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenStreaming}
            className="flex items-center justify-center p-2 border border-primary text-primary hover:bg-primary hover:text-black transition-colors"
            aria-label="Ver streaming"
          >
            <Radio size={16} className="animate-pulse" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-grunge-white hover:text-primary transition-colors border border-zinc-800"
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden w-full bg-black border-t-2 border-primary/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-display font-black text-lg tracking-wider uppercase py-1 border-b border-zinc-900 ${
                    activeSection === item.id ? 'text-secondary pl-2 border-l-2 border-secondary' : 'text-grunge-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenStreaming();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-black border-2 border-primary text-primary hover:bg-primary hover:text-black py-3 font-display font-extrabold text-sm tracking-wider uppercase transition-all"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  VER STREAMING EN VIVO
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick('registro');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-black hover:bg-secondary-dim py-3 font-display font-extrabold text-sm tracking-wider uppercase transition-all"
                >
                  <UserPlus size={16} />
                  ÚNETE AL ROSTER
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
