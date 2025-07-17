import { MatchData, TeamStats, KeyPlayer, Player } from '../types';

export const calculateTeamStats = (matchData: MatchData): { teamA: TeamStats; teamB: TeamStats } => {
  const calculateStats = (players: Player[]): TeamStats => {
    const stats = {
      kills: 0,
      aces: 0,
      blocks: 0,
      errors: 0,
      killAttempts: 0
    };

    players.forEach(player => {
      stats.kills += player.kills;
      stats.aces += player.aces;
      stats.blocks += player.blocks;
      stats.errors += player.errors;
      stats.killAttempts += player.killAttempts;
    });

    return {
      ...stats,
      killPercentage: stats.killAttempts > 0 ? Math.round((stats.kills / stats.killAttempts) * 100) : 0
    };
  };

  return {
    teamA: calculateStats(matchData.teamA.players),
    teamB: calculateStats(matchData.teamB.players)
  };
};

export const findKeyPlayers = (matchData: MatchData): { teamA: KeyPlayer; teamB: KeyPlayer } => {
  const findTopPlayer = (players: Player[], teamName: string, teamKey: 'A' | 'B'): KeyPlayer => {
    let bestPlayer: KeyPlayer = {
      player: null,
      score: -1,
      teamName,
      teamKey
    };

    players.forEach(player => {
      const playerScore = player.kills * 2 + player.blocks;
      if (playerScore > bestPlayer.score) {
        bestPlayer = {
          player,
          score: playerScore,
          teamName,
          teamKey
        };
      }
    });

    return bestPlayer;
  };

  return {
    teamA: findTopPlayer(matchData.teamA.players, matchData.teamA.name, 'A'),
    teamB: findTopPlayer(matchData.teamB.players, matchData.teamB.name, 'B')
  };
};

export const createPlayer = (name: string): Player => ({
  name,
  kills: 0,
  killAttempts: 0,
  aces: 0,
  serveFaults: 0,
  blocks: 0,
  digs: 0,
  errors: 0
});

export const createTeam = (name: string, players: string[]) => ({
  name,
  score: 0,
  setScore: 0,
  players: players.map(createPlayer)
});