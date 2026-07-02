import React from 'react';
import { Mail, Instagram, Twitter, Youtube, ArrowUp, Send } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Felicidades parcero! Te has registrado en los boletines oficiales de Distrito X ⚡");
  };

  return (
    <footer className="bg-zinc-950 border-t-4 border-primary text-grunge-white relative overflow-hidden">
      {/* Background slash effect */}
      <div className="absolute left-0 bottom-0 top-0 w-24 warning-strip opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        
        {/* Top block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-zinc-900 pb-12 mb-12">
          
          {/* Logo and statement */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h3 className="font-display font-black text-3xl italic tracking-tighter text-grunge-white">
              DISTRITO <span className="text-primary">X</span>
            </h3>
            <p className="font-mono text-[10px] bg-secondary text-black px-2 py-0.5 inline-block font-bold uppercase tracking-widest self-start clip-dogear">
              ADN DE MEDELLÍN • FESTIVAL URBANO 2026
            </p>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed max-w-sm mt-1">
              El festival de deportes extremos y cultura urbana más poderoso de Antioquia. Uniendo ruedas, asfalto, rimas, moda y arte en una experiencia irrepetible.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-secondary">NAVEGACIÓN</h4>
            <ul className="space-y-2 font-mono text-xs text-zinc-500">
              {['FESTIVAL', 'PROTAGONISTAS', 'MENTORES', 'MAPA'].map((label) => (
                <li key={label}>
                  <button 
                    onClick={() => onScrollToSection(label.toLowerCase())}
                    className="hover:text-primary transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-display font-black text-xs uppercase tracking-widest text-secondary">¿QUIERES VER MÁS?</h4>
            <p className="font-sans text-xs text-zinc-400">Suscríbete para recibir códigos de ingreso prioritario y novedades del line-up.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
              <input 
                type="email" 
                required
                placeholder="Escribe tu correo..."
                className="flex-1 bg-black border border-zinc-800 text-xs px-3 py-2 text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-700 font-sans"
              />
              <button 
                type="submit"
                className="bg-primary text-black hover:bg-primary-dim px-3 py-2 flex items-center justify-center transition-colors"
                aria-label="Registrar"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="font-mono text-xs text-zinc-600">
              DISTRITO X © {currentYear} • TODOS LOS DERECHOS RESERVADOS.
            </span>
            <span className="hidden sm:inline-block text-zinc-800">|</span>
            <a 
              href="mailto:distritox5@gmail.com" 
              className="font-mono text-xs text-secondary hover:text-primary flex items-center gap-1.5 transition-colors"
            >
              <Mail size={13} />
              distritox5@gmail.com
            </a>
          </div>

          {/* Socials & Scroll up */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 border border-zinc-900 hover:border-primary text-zinc-500 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 border border-zinc-900 hover:border-primary text-zinc-500 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={14} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 border border-zinc-900 hover:border-primary text-zinc-500 hover:text-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={14} />
              </a>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 bg-zinc-900 text-grunge-white hover:bg-primary hover:text-black transition-colors"
              title="Subir al inicio"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
