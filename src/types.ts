export interface RosterMember {
  id: string;
  name: string;
  role: 'Atleta' | 'Artista' | 'Creador' | 'Emprendedor';
  discipline: string;
  bio: string;
  instagram: string;
  imageUrl: string;
  isUserSubmitted?: boolean;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  day: number;
  time: string;
  location: string;
  description: string;
  performers: string[];
  category: 'Skate' | 'BMX' | 'Freestyle' | 'Moto' | 'Música' | 'Cultura';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
  achievement: string;
}
