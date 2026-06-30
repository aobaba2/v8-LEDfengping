export interface MatchEvent {
  minute: string;
  type: 'goal' | 'card_yellow' | 'card_red' | 'substitution';
  player: string;
  team: 'home' | 'away';
}

export interface SoccerMatch {
  id: string;
  league: string;
  leagueColor: string; // Tailwind text color class, e.g. "text-cyan-400"
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  minute?: string;
  matchTime?: string;
  events?: MatchEvent[];
}

export interface DishItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tags: string[];
}

export interface LeagueStanding {
  rank: number;
  team: string;
  played: number;
  gd: string; // Goal difference e.g. "+15"
  points: number;
}
