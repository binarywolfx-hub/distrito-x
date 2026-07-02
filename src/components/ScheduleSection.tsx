import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { scheduleEvents } from '../data';
import { ScheduleEvent } from '../types';
import { Calendar, Clock, MapPin, Sparkles, Check, Bookmark, BookmarkCheck } from 'lucide-react';

export default function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showOnlyMySchedule, setShowOnlyMySchedule] = useState<boolean>(false);

  // Load user bookmarks
  useEffect(() => {
    const saved = localStorage.getItem('distritox_schedule_bookmarks');
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch (e) {
        setBookmarkedIds([]);
      }
    }
  }, []);

  const toggleBookmark = (id: string) => {
    let updated: string[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(bId => bId !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem('distritox_schedule_bookmarks', JSON.stringify(updated));
  };

  const categories = ['Todos', 'Skate', 'BMX', 'Freestyle', 'Moto', 'Música', 'Cultura'];

  const filteredEvents = scheduleEvents.filter(event => {
    const matchesDay = showOnlyMySchedule || event.day === selectedDay;
    const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
    const matchesBookmark = !showOnlyMySchedule || bookmarkedIds.includes(event.id);
    return matchesDay && matchesCategory && matchesBookmark;
  });

  return (
    <section id="festival" className="py-24 bg-asphalt relative border-t-2 border-b-2 border-primary/20">
      {/* Background neon visual line */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="border-l-4 border-secondary pl-4 md:pl-6">
            <p className="font-mono text-xs text-secondary font-black uppercase tracking-widest flex items-center gap-1">
              <Calendar size={14} /> CRONOGRAMA OFICIAL 2026
            </p>
            <h2 className="font-display font-black italic text-4xl md:text-6xl text-grunge-white uppercase tracking-tighter mt-1 leading-none">
              PROGRAMACIÓN Y <span className="text-primary">LINE-UP</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-xl mt-3 leading-relaxed">
              No te pierdas un solo segundo de adrenalina. Filtra por día o crea tu propio itinerario personalizado seleccionando tus eventos favoritos.
            </p>
          </div>

          {/* Schedule Bookmark filter */}
          <button
            onClick={() => setShowOnlyMySchedule(!showOnlyMySchedule)}
            className={`px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 transition-all ${
              showOnlyMySchedule 
                ? 'bg-secondary text-black border-secondary font-black rotate-1' 
                : 'border-zinc-800 text-zinc-400 hover:text-grunge-white hover:border-zinc-700'
            }`}
          >
            {showOnlyMySchedule ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {showOnlyMySchedule ? `VER TODA LA AGENDA` : `MI ITINERARIO (${bookmarkedIds.length})`}
          </button>
        </div>

        {/* Day selection tabs */}
        {!showOnlyMySchedule && (
          <div className="flex justify-center gap-2 md:gap-4 mb-10">
            {[1, 2, 3].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 max-w-[200px] py-4 font-display font-black text-center text-sm md:text-base italic uppercase tracking-wider transition-all rounded-none border-2 relative ${
                  selectedDay === day
                    ? 'bg-primary text-black border-primary font-black -skew-x-6'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-grunge-white hover:border-zinc-800 -skew-x-6'
                }`}
              >
                DÍA 0{day}
                <span className="block font-mono text-[10px] tracking-normal font-normal not-italic opacity-80">
                  {day === 1 ? 'Viernes 17 Oct' : day === 2 ? 'Sábado 18 Oct' : 'Domingo 19 Oct'}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Category Filters inside day */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-12 bg-black/40 p-2 border border-zinc-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-mono text-[11px] font-black uppercase transition-colors ${
                selectedCategory === cat
                  ? 'bg-zinc-800 text-secondary'
                  : 'text-zinc-500 hover:text-grunge-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Timeline listing */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-black/20 border border-dashed border-zinc-800 p-8"
              >
                <p className="font-mono text-sm text-zinc-600">
                  {showOnlyMySchedule 
                    ? 'Aún no has agregado eventos a tu Itinerario. ¡Haz clic en el ícono de marcador de los eventos del festival!' 
                    : 'No hay eventos agendados para esta categoría este día.'}
                </p>
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-950 border-2 border-zinc-900 hover:border-secondary/40 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all relative group"
                >
                  {/* Category Accent Indicator */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                    event.category === 'Skate' ? 'bg-primary' :
                    event.category === 'BMX' ? 'bg-secondary' :
                    event.category === 'Freestyle' ? 'bg-green-500' :
                    event.category === 'Moto' ? 'bg-red-500' : 'bg-purple-500'
                  }`} />

                  {/* Date/Time column */}
                  <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1.5 min-w-[130px]">
                    <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-secondary">
                      <Clock size={14} />
                      {event.time}
                    </div>
                    <span className="font-mono text-[10px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-none font-bold uppercase">
                      DÍA 0{event.day}
                    </span>
                  </div>

                  {/* Event Details column */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-[9px] font-black bg-zinc-800 text-grunge-white px-2 py-0.5 uppercase tracking-widest clip-dogear">
                        {event.category}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500 flex items-center gap-1">
                        <MapPin size={11} className="text-primary" />
                        {event.location}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-xl md:text-2xl text-grunge-white uppercase italic group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>

                    <p className="font-sans text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                      {event.description}
                    </p>

                    {event.performers.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-600">PROTAGONISTAS:</span>
                        {event.performers.map((p, i) => (
                          <span 
                            key={i} 
                            className="font-mono text-[10px] text-secondary bg-zinc-900/60 px-2 py-0.5 border border-zinc-800/80 font-bold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleBookmark(event.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] font-black uppercase transition-all rounded-none border ${
                        bookmarkedIds.includes(event.id)
                          ? 'bg-secondary/10 border-secondary text-secondary'
                          : 'border-zinc-800 text-zinc-500 hover:text-grunge-white hover:border-zinc-700'
                      }`}
                    >
                      {bookmarkedIds.includes(event.id) ? (
                        <>
                          <Check size={12} className="text-secondary" /> AGENDA ACTIVADA
                        </>
                      ) : (
                        <>
                          <Bookmark size={12} /> AGREGAR A AGENDA
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Warning Accent Box */}
        <div className="mt-20 bg-secondary text-black p-4 md:p-6 rounded-none relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="absolute top-0 right-0 warning-strip-yellow h-full w-24 opacity-20"></div>
          
          <div className="flex items-center gap-3.5">
            <span className="p-2.5 bg-black text-secondary">
              <Sparkles size={20} className="animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <div>
              <p className="font-display font-black italic text-lg md:text-xl uppercase leading-none">
                ¿TIENES TU ITINERARIO LISTO PARA EL STREAMING?
              </p>
              <p className="font-sans text-xs text-black/80 font-semibold mt-1">
                Recibirás recordatorios automáticos de los eventos seleccionados en tu navegador mientras sigues el live stream de Distrito X.
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById('header-logo');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-black text-secondary hover:bg-zinc-900 font-mono text-[11px] font-black uppercase px-4 py-2.5 border-2 border-black tracking-widest clip-dogear whitespace-nowrap"
          >
            REGRESAR ARRIBA
          </button>
        </div>

      </div>
    </section>
  );
}
