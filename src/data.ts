import { RosterMember, ScheduleEvent, Mentor } from './types';

export const initialRoster: RosterMember[] = [
  {
    id: 'r1',
    name: 'Santi "Glock" Restrepo',
    role: 'Atleta',
    discipline: 'Skateboarding Street',
    bio: 'Nacido en la Comuna 13. Ganador del Red Bull Skate local 2025. Experto en rieles y gaps pesados.',
    instagram: '@santi_glock',
    imageUrl: 'https://images.unsplash.com/photo-1564982743470-47de0ceecaf8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r2',
    name: 'Valentina "B-girl Fly" Calle',
    role: 'Artista',
    discipline: 'Breaking / Dance',
    bio: 'Representando a Medellín en la escena de baile internacional. Su estilo combina folclor andino con breaking puro.',
    instagram: '@bgirl_fly',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r3',
    name: 'Mateo "Keko" Moreno',
    role: 'Atleta',
    discipline: 'BMX Freestyle',
    bio: 'Dominando los parques y bowls de Antioquia. Famoso por su fluidez en el aire y backflips perfectos.',
    instagram: '@keko_bmx',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r4',
    name: 'MC Carpediem / Juan',
    role: 'Artista',
    discipline: 'Freestyle Rap',
    bio: 'Líder del circuito underground de Medellín. Su rima rápida y lírica cruda retrata la realidad de la calle.',
    instagram: '@mccarpediem_medellin',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r5',
    name: 'Daniela "Vera" Toro',
    role: 'Creador',
    discipline: 'Street Wear & Diseño',
    bio: 'Creadora de la marca de ropa independiente "La Comuna". Transforma prendas desechadas en alta costura urbana.',
    instagram: '@vera_design',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'r6',
    name: 'Esteban "Stunt" Cardona',
    role: 'Atleta',
    discipline: 'Stunt Riding Moto',
    bio: 'Piloto profesional de acrobacias en moto. El asfalto de Medellín es su lienzo para trucos al límite de la gravedad.',
    instagram: '@estebanstunt',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=400'
  }
];

export const mentors: Mentor[] = [
  {
    id: 'm1',
    name: 'David "El Patrón" Restrepo',
    role: 'Empresario & Productor Musical',
    description: 'CEO de "Zona Urbana Records". Ha impulsado a más de 20 artistas de las comunas al estrellato global de Spotify.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    achievement: 'Descubridor de talentos globales'
  },
  {
    id: 'm2',
    name: 'Luisa "Vuelo" Henao',
    role: 'Pionera del Skateboarding Colombiano',
    description: 'Campeona panamericana de skate. Fundadora de la fundación "Ruedas de Esperanza" para niños vulnerables.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    achievement: 'Leyenda del Deporte Extremo'
  },
  {
    id: 'm3',
    name: 'Andrés "Spray" Ortega',
    role: 'Muralista & Artista Visual',
    description: 'Artista urbano con obras en Berlín, Nueva York y Medellín. Convierte fachadas grises en relatos comunitarios vibrantes.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    achievement: 'Referente Mundial de Street Art'
  }
];

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: 'e1',
    title: 'Warm-up & Skate Jam Apertura',
    day: 1,
    time: '14:00 - 16:30',
    location: 'Estadio - Skatepark Sur',
    description: 'Prácticas abiertas de skate y bmx. Música en vivo a cargo de DJ Noise.',
    performers: ['Santi "Glock"', 'Mateo "Keko"'],
    category: 'Skate'
  },
  {
    id: 'e2',
    title: 'Cultura Urbana: Graffiti Live Session',
    day: 1,
    time: '17:00 - 19:30',
    location: 'Parques del Río - Muro Distrito',
    description: 'Murales pintados en tiempo real por artistas locales bajo la tutoría de Andrés Ortega.',
    performers: ['Andrés "Spray" Ortega', 'Daniela "Vera" Toro'],
    category: 'Cultura'
  },
  {
    id: 'e3',
    title: 'Hip Hop & Breaking Showcase',
    day: 1,
    time: '20:00 - 22:00',
    location: 'Teatro Carlos Vieco',
    description: 'Batallas de breakdance por tripulaciones (crews) de toda Colombia.',
    performers: ['Valentina "B-girl Fly" Calle'],
    category: 'Música'
  },
  {
    id: 'e4',
    title: 'BMX Best Trick & Ramp Jam',
    day: 2,
    time: '15:00 - 18:00',
    location: 'Estadio - Rampas Distrito X',
    description: 'Acróbacias aéreas extremas donde el truco más insano se lleva la corona.',
    performers: ['Mateo "Keko" Moreno'],
    category: 'BMX'
  },
  {
    id: 'e5',
    title: 'Batalla de Freestyle: "El Grito de la Calle"',
    day: 2,
    time: '19:00 - 22:30',
    location: 'Comuna 13 - Plaza del Recreo',
    description: 'La batalla de rap improvisado más esperada. 16 MCs compiten por el título supremo.',
    performers: ['MC Carpediem', 'David "El Patrón" Restrepo'],
    category: 'Freestyle'
  },
  {
    id: 'e6',
    title: 'Stunt Riding & Moto Adrenalina Show',
    day: 3,
    time: '14:00 - 17:00',
    location: 'Circuito Avenida San Juan',
    description: 'Maniobras y trucos extremos en dos ruedas por los mejores pilotos stunt del país.',
    performers: ['Esteban "Stunt" Cardona'],
    category: 'Moto'
  },
  {
    id: 'e7',
    title: 'Pasarela Street Wear & Roster Awards',
    day: 3,
    time: '18:00 - 20:00',
    location: 'Parques del Río - Domo Central',
    description: 'Exhibición de moda urbana independiente y premiación de los ganadores del Roster 2026.',
    performers: ['Daniela "Vera" Toro', 'Luisa "Vuelo" Henao'],
    category: 'Cultura'
  },
  {
    id: 'e8',
    title: 'Gran Cierre: Concierto Distrito X',
    day: 3,
    time: '20:30 - 23:30',
    location: 'Aeroparque Juan Pablo II',
    description: 'El concierto masivo de cierre del festival con leyendas locales y sorpresas internacionales.',
    performers: ['MC Carpediem', 'Todos los Protagonistas'],
    category: 'Música'
  }
];

export const festivalHubs = [
  {
    id: 'h1',
    name: 'Estadio Skatepark',
    description: 'Epicentro de deportes extremos (Skate & BMX). Las rampas y barandas más brutales.',
    x: 35,
    y: 45
  },
  {
    id: 'h2',
    name: 'Parques del Río',
    description: 'Sede cultural, grafitis interactivos, ferias de Street Wear y pasarelas de moda.',
    x: 55,
    y: 60
  },
  {
    id: 'h3',
    name: 'Teatro Carlos Vieco',
    description: 'Batallas de breakdance y escenario de rap/rock con acústica al aire libre única.',
    x: 65,
    y: 75
  },
  {
    id: 'h4',
    name: 'Comuna 13 (Plaza)',
    description: 'La cuna del freestyle rap urbano y arte callejero. El latido real del asfalto.',
    x: 20,
    y: 35
  }
];
