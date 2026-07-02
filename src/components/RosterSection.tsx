import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RosterMember } from '../types';
import { initialRoster } from '../data';
import { Search, UserPlus, Flame, Instagram, Sparkles, Filter, CheckCircle } from 'lucide-react';

export default function RosterSection() {
  const [members, setMembers] = useState<RosterMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Todos');
  const [selectedMember, setSelectedMember] = useState<RosterMember | null>(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    role: 'Atleta' as RosterMember['role'],
    discipline: '',
    bio: '',
    instagram: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Local support votes state
  const [votes, setVotes] = useState<Record<string, number>>({});

  // Load from localStorage or defaults
  useEffect(() => {
    const stored = localStorage.getItem('distritox_roster');
    if (stored) {
      try {
        setMembers(JSON.parse(stored));
      } catch (e) {
        setMembers(initialRoster);
      }
    } else {
      setMembers(initialRoster);
    }

    const storedVotes = localStorage.getItem('distritox_votes');
    if (storedVotes) {
      try {
        setVotes(JSON.parse(storedVotes));
      } catch (e) {
        // Initial setup of random votes for realism
        const initVotes: Record<string, number> = {};
        initialRoster.forEach(m => {
          initVotes[m.id] = Math.floor(Math.random() * 150) + 50;
        });
        setVotes(initVotes);
      }
    } else {
      const initVotes: Record<string, number> = {};
      initialRoster.forEach(m => {
        initVotes[m.id] = Math.floor(Math.random() * 150) + 50;
      });
      setVotes(initVotes);
      localStorage.setItem('distritox_votes', JSON.stringify(initVotes));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.discipline.trim() || !formData.bio.trim()) {
      alert("Por favor llena todos los campos necesarios");
      return;
    }

    // Generate random avatar placeholder
    const imageSeeds = ['urban', 'skater', 'spray', 'dancer', 'dj', 'rider'];
    const randomSeed = imageSeeds[Math.floor(Math.random() * imageSeeds.length)];
    const randomId = 'user_' + Date.now().toString();
    const newMember: RosterMember = {
      id: randomId,
      name: formData.name,
      role: formData.role,
      discipline: formData.discipline,
      bio: formData.bio,
      instagram: formData.instagram.startsWith('@') ? formData.instagram : `@${formData.instagram}`,
      imageUrl: `https://images.unsplash.com/photo-${getSeedImageId(randomSeed)}?auto=format&fit=crop&q=80&w=400`,
      isUserSubmitted: true
    };

    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);
    localStorage.setItem('distritox_roster', JSON.stringify(updatedMembers));

    // Register 1 starting vote
    const updatedVotes = { ...votes, [randomId]: 1 };
    setVotes(updatedVotes);
    localStorage.setItem('distritox_votes', JSON.stringify(updatedVotes));

    setIsRegistered(true);
    setFormData({
      name: '',
      role: 'Atleta',
      discipline: '',
      bio: '',
      instagram: '',
    });

    // Timeout reset registration success state
    setTimeout(() => {
      setIsRegistered(false);
    }, 5000);
  };

  const getSeedImageId = (seed: string) => {
    switch (seed) {
      case 'urban': return '1511556532297-f12146850252';
      case 'skater': return '1564982743470-47de0ceecaf8';
      case 'spray': return '1506157786151-b8491531f063';
      case 'dancer': return '1508700115892-45ecd05ae2ad';
      case 'dj': return '1493225457124-a3eb161ffa5f';
      default: return '1558981806-ec527fa84c39';
    }
  };

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal trigger
    const updatedVotes = {
      ...votes,
      [id]: (votes[id] || 0) + 1
    };
    setVotes(updatedVotes);
    localStorage.setItem('distritox_votes', JSON.stringify(updatedVotes));
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'Todos' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <section id="protagonistas" className="py-24 bg-black relative overflow-hidden">
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title Section */}
        <div className="mb-16 border-l-4 border-primary pl-4 md:pl-6">
          <p className="font-mono text-xs text-primary font-black uppercase tracking-widest flex items-center gap-1">
            <Flame size={14} className="animate-pulse" /> PROTAGONISTAS X
          </p>
          <h2 className="font-display font-black italic text-4xl md:text-6xl text-grunge-white uppercase tracking-tighter mt-1 leading-none">
            SI TIENES TALENTO, <span className="text-secondary">ESTE ES TU LUGAR</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-3xl mt-4 leading-relaxed">
            No importa si eres <strong className="text-grunge-white">ATLETA, PARATLETA, ARTISTA O CREADOR</strong>. 
            Distrito X fue diseñado para descubrir, impulsar y proyectar nuevos talentos de Medellín. 
            Aquí podrás competir, mostrar lo que haces y conectar con referentes reales.
          </p>
        </div>

        {/* Dynamic Split Layout: Interactive form and Poster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Join / Registration Form */}
          <div id="registro" className="lg:col-span-7 bg-surface-dark border-3 border-primary/40 p-6 md:p-8 rounded-none relative">
            <div className="absolute top-0 right-0 warning-strip h-2 w-1/3"></div>
            
            <h3 className="font-display font-black italic text-2xl text-grunge-white mb-2 uppercase tracking-wide">
              REVOLUCIONA LA CALLE: ÚNETE AL ROSTER
            </h3>
            <p className="font-sans text-xs text-zinc-400 mb-6">
              Completa el formulario oficial para inscribir tu perfil. Aparecerás automáticamente en el buscador público de talentos de Distrito X.
            </p>

            <AnimatePresence mode="wait">
              {isRegistered ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-primary/10 border-2 border-primary p-6 text-center py-10"
                >
                  <CheckCircle size={48} className="mx-auto text-primary mb-4" />
                  <h4 className="font-display font-black italic text-xl text-grunge-white mb-1 uppercase">
                    ¡INSCRIPCIÓN REGISTRADA!
                  </h4>
                  <p className="font-sans text-xs text-zinc-300 max-w-sm mx-auto">
                    Tu talento ha sido agregado a las filas de Distrito X. Revisa la cuadrícula a continuación para buscar tu perfil y recibir apoyos de la comunidad.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1">Nombre / Alias *</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej: B-girl Fenix"
                        className="w-full bg-black border border-zinc-800 text-sm px-3 py-2 text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-700"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1">Categoría *</label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-800 text-sm px-3 py-2 text-grunge-white focus:outline-none focus:border-primary"
                      >
                        <option value="Atleta">Atleta (Deporte Extremo)</option>
                        <option value="Artista">Artista (Música / Danza / Grafiti)</option>
                        <option value="Creador">Creador (Moda / Contenido)</option>
                        <option value="Emprendedor">Emprendedor (Negocio Calle)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1">Especialidad / Disciplina *</label>
                      <input 
                        type="text" 
                        name="discipline"
                        required
                        value={formData.discipline}
                        onChange={handleInputChange}
                        placeholder="Ej: Skate Street / Rap Impro / DJ"
                        className="w-full bg-black border border-zinc-800 text-sm px-3 py-2 text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-700"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1">Instagram (Opcional)</label>
                      <input 
                        type="text" 
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="Ej: @bgirl_fenix"
                        className="w-full bg-black border border-zinc-800 text-sm px-3 py-2 text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-zinc-500 uppercase mb-1">Biografía / Mensaje Urbano *</label>
                    <textarea 
                      name="bio"
                      required
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Describe tu trayectoria, de qué comuna vienes y qué te inspira..."
                      className="w-full bg-black border border-zinc-800 text-sm px-3 py-2 text-grunge-white focus:outline-none focus:border-primary placeholder-zinc-700 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-black hover:bg-primary-dim font-display font-black text-xs py-3 tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                  >
                    <UserPlus size={14} /> Enviar Inscripción al Roster
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Aggressive Poster visual on the right */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative border-4 border-secondary p-2 bg-black self-center max-w-[340px] shadow-[10px_10px_0px_#ff571a] group overflow-hidden">
              <div className="absolute top-0 right-0 warning-strip-yellow h-8 w-24 z-10 rotate-12 translate-x-6 -translate-y-2"></div>
              
              <img 
                src="/src/assets/images/distrito_x_protagonistas_1782829832190.jpg"
                alt="Cartel de Distrito X" 
                className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300 object-cover"
                referrerPolicy="no-referrer"
              />
              
              <div className="bg-secondary text-black p-3 mt-2 text-center font-display font-black italic uppercase text-xs tracking-wider">
                ÚNETE AL ROSTER OFICIAL DE DISTRITO X
              </div>
            </div>
          </div>

        </div>

        {/* Talent Catalog Explorer */}
        <div className="border-t border-zinc-900 pt-16">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 mb-12">
            
            {/* Left Filter Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-zinc-500 mr-2 flex items-center gap-1">
                <Filter size={12} /> FILTRAR:
              </span>
              {['Todos', 'Atleta', 'Artista', 'Creador', 'Emprendedor'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 font-mono text-xs font-bold transition-all relative ${
                    selectedRole === role 
                      ? 'bg-secondary text-black font-black rotate-1' 
                      : 'border border-zinc-800 text-zinc-400 hover:text-grunge-white hover:border-zinc-600'
                  }`}
                >
                  {role}S
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar talento, apodo o arte..."
                className="w-full bg-zinc-950 border-b-2 border-zinc-800 focus:border-primary text-xs pl-9 pr-4 py-2.5 text-grunge-white focus:outline-none transition-all placeholder-zinc-600 font-sans"
              />
            </div>

          </div>

          {/* Grid display */}
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-900 bg-surface-dark/40">
              <p className="font-mono text-sm text-zinc-600">No se encontraron talentos que coincidan con tu búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  onClick={() => setSelectedMember(member)}
                  className="bg-surface-card border-2 border-zinc-900 hover:border-primary transition-all duration-300 p-4 relative group cursor-pointer flex flex-col justify-between"
                  whileHover={{ y: -5 }}
                >
                  {/* Tape style role badge */}
                  <span className="absolute top-4 right-4 z-10 font-mono text-[9px] font-black bg-grunge-white text-black px-2 py-0.5 uppercase tracking-widest clip-dogear shadow-sm">
                    {member.role}
                  </span>

                  <div>
                    <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden mb-4">
                      <img 
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      
                      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10px] text-secondary bg-black/80 px-1.5 py-0.5 border border-secondary/20">
                          {member.discipline}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-grunge-white uppercase italic group-hover:text-primary transition-colors mb-2">
                      {member.name}
                    </h4>

                    <p className="font-sans text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>

                  {/* Actions footer of card */}
                  <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-auto">
                    <span className="font-mono text-[11px] text-zinc-500 flex items-center gap-1">
                      <Instagram size={12} className="text-secondary" />
                      {member.instagram}
                    </span>

                    <button
                      onClick={(e) => handleVote(member.id, e)}
                      className="flex items-center gap-1 bg-black hover:bg-primary hover:text-black border border-primary/40 px-2.5 py-1.5 font-mono text-[10px] text-primary transition-all font-black uppercase"
                    >
                      <Sparkles size={11} />
                      APOYAR ({votes[member.id] || 0})
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Profile Detail Dialog */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-surface-dark border-3 border-secondary w-full max-w-lg p-6 relative rounded-none text-grunge-white"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-1.5 border border-zinc-800 text-grunge-white hover:text-primary hover:border-primary transition-colors"
              >
                ✕
              </button>

              <div className="absolute top-0 left-0 warning-strip-yellow h-1.5 w-1/4"></div>

              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className="w-full sm:w-2/5 aspect-square sm:aspect-[3/4] bg-zinc-950 overflow-hidden border-2 border-zinc-800">
                  <img 
                    src={selectedMember.imageUrl} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-primary text-black font-mono font-bold text-[9px] px-2 py-0.5 uppercase tracking-widest">
                      {selectedMember.role}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">ROSTER ID: {selectedMember.id}</span>
                  </div>

                  <h3 className="font-display font-black italic text-2xl text-grunge-white uppercase leading-none">
                    {selectedMember.name}
                  </h3>
                  <p className="font-mono text-xs text-secondary mb-4 mt-1">{selectedMember.discipline}</p>
                  
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 border-l-2 border-primary">
                    {selectedMember.bio}
                  </p>

                  <div className="flex flex-col gap-2.5 mt-5">
                    <a 
                      href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-zinc-800 hover:border-secondary hover:text-secondary px-3 py-2 font-mono text-xs transition-colors"
                    >
                      <Instagram size={14} /> SÍGUELO EN INSTAGRAM ({selectedMember.instagram})
                    </a>

                    <button
                      onClick={(e) => handleVote(selectedMember.id, e)}
                      className="w-full bg-secondary text-black hover:bg-secondary-dim px-3 py-2.5 font-display font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <Flame size={14} /> DAR VOTO DE APOYO URBANO ({votes[selectedMember.id] || 0})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
