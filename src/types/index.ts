export interface Player {
  name: string;
  kills: number;
  killAttempts: number;
  aces: number;
  serveFaults: number;
  blocks: number;
  digs: number;
  errors: number;
}

export interface Team {
  name: string;
  score: number;
  setScore: number;
  players: Player[];
}

export interface PlayByPlayEntry {
  teamKey: 'A' | 'B' | null;
  score: string;
  text: string;
  timestamp: string;
}

export interface MatchData {
  creatorId: string;
  teamA: Team;
  teamB: Team;
  playByPlay: PlayByPlayEntry[];
  createdAt: string;
  matchSummary?: string;
  coachAnalysis?: string;
}

export interface TeamStats {
  kills: number;
  aces: number;
  blocks: number;
  errors: number;
  killAttempts: number;
  killPercentage: number;
}

export interface KeyPlayer {
  player: Player | null;
  score: number;
  teamName: string;
  teamKey: 'A' | 'B';
}