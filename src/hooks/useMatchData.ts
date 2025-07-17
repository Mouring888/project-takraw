import { useState, useEffect } from 'react';
import { MatchData, PlayByPlayEntry } from '../types';
import { createTeam } from '../utils/matchUtils';
import { v4 as uuidv4 } from 'uuid';

export const useMatchData = () => {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [history, setHistory] = useState<MatchData[]>([]);
  const [matchId, setMatchId] = useState<string | null>(null);

  const createMatch = (teamAData: { name: string; players: string[] }, teamBData: { name: string; players: string[] }) => {
    const newMatchId = uuidv4();
    const newMatchData: MatchData = {
      creatorId: 'demo-user',
      teamA: createTeam(teamAData.name, teamAData.players),
      teamB: createTeam(teamBData.name, teamBData.players),
      playByPlay: [],
      createdAt: new Date().toISOString()
    };

    setMatchId(newMatchId);
    setMatchData(newMatchData);
    setHistory([]);
    
    // Store in localStorage for persistence
    localStorage.setItem('takrawMatchId', newMatchId);
    localStorage.setItem('takrawMatchData', JSON.stringify(newMatchData));
  };

  const updateMatchData = (newData: MatchData) => {
    if (matchData) {
      setHistory(prev => [...prev.slice(-9), matchData]); // Keep last 10 for undo
    }
    setMatchData(newData);
    
    // Update localStorage
    if (matchId) {
      localStorage.setItem('takrawMatchData', JSON.stringify(newData));
    }
  };

  const recordEvent = (teamKey: 'A' | 'B', type: string, playerIndex: number, isOpponentError = false) => {
    if (!matchData) return;

    const newMatchData = JSON.parse(JSON.stringify(matchData));
    const team = teamKey === 'A' ? newMatchData.teamA : newMatchData.teamB;
    const opponentTeam = teamKey === 'A' ? newMatchData.teamB : newMatchData.teamA;
    const player = team.players[playerIndex];

    let logText = '';
    const pointWinningTeamKey = isOpponentError ? (teamKey === 'A' ? 'B' : 'A') : teamKey;
    const pointWinningTeam = isOpponentError ? opponentTeam : team;

    switch (type) {
      case 'kill':
        pointWinningTeam.score++;
        player.kills++;
        player.killAttempts++;
        logText = `ทีม ${pointWinningTeam.name} ได้แต้ม! ${player.name} ฟาดสำเร็จ`;
        break;
      case 'ace':
        pointWinningTeam.score++;
        player.aces++;
        logText = `เสิร์ฟเอซ! โดย ${player.name} จากทีม ${pointWinningTeam.name}`;
        break;
      case 'block':
        pointWinningTeam.score++;
        player.blocks++;
        logText = `บล็อกยอดเยี่ยม! ${player.name} บล็อกได้แต้มให้ทีม ${pointWinningTeam.name}`;
        break;
      case 'error':
        opponentTeam.score++;
        player.errors++;
        logText = `ทีม ${opponentTeam.name} ได้แต้มจากข้อผิดพลาดของ ${player.name}`;
        break;
      case 'serveFault':
        opponentTeam.score++;
        player.serveFaults++;
        player.errors++;
        logText = `ทีม ${opponentTeam.name} ได้แต้มจาก ${player.name} เสิร์ฟเสีย`;
        break;
      case 'attackError':
        opponentTeam.score++;
        player.errors++;
        player.killAttempts++;
        logText = `ทีม ${opponentTeam.name} ได้แต้มจาก ${player.name} ฟาดพลาด`;
        break;
    }

    const currentScore = `${newMatchData.teamA.score}-${newMatchData.teamB.score}`;
    const playByPlayEntry: PlayByPlayEntry = {
      teamKey: pointWinningTeamKey,
      score: currentScore,
      text: logText,
      timestamp: new Date().toISOString()
    };

    newMatchData.playByPlay.push(playByPlayEntry);
    updateMatchData(newMatchData);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setMatchData(previousState);
      
      if (matchId) {
        localStorage.setItem('takrawMatchData', JSON.stringify(previousState));
      }
    }
  };

  const endSet = () => {
    if (!matchData) return;

    const newMatchData = JSON.parse(JSON.stringify(matchData));
    
    if (newMatchData.teamA.score > newMatchData.teamB.score) {
      newMatchData.teamA.setScore++;
    } else if (newMatchData.teamB.score > newMatchData.teamA.score) {
      newMatchData.teamB.setScore++;
    } else {
      alert('คะแนนเท่ากัน ไม่สามารถจบเซตได้');
      return;
    }

    newMatchData.teamA.score = 0;
    newMatchData.teamB.score = 0;
    
    const playByPlayEntry: PlayByPlayEntry = {
      teamKey: null,
      score: `${newMatchData.teamA.setScore}-${newMatchData.teamB.setScore}`,
      text: '--- จบเซต ---',
      timestamp: new Date().toISOString()
    };

    newMatchData.playByPlay.push(playByPlayEntry);
    updateMatchData(newMatchData);
    setHistory([]); // Clear history after set end
  };

  const resetMatch = () => {
    setMatchData(null);
    setMatchId(null);
    setHistory([]);
    localStorage.removeItem('takrawMatchId');
    localStorage.removeItem('takrawMatchData');
  };

  // Load match data from localStorage on component mount
  useEffect(() => {
    const savedMatchId = localStorage.getItem('takrawMatchId');
    const savedMatchData = localStorage.getItem('takrawMatchData');
    
    if (savedMatchId && savedMatchData) {
      try {
        const parsedData = JSON.parse(savedMatchData);
        setMatchId(savedMatchId);
        setMatchData(parsedData);
      } catch (error) {
        console.error('Error loading saved match data:', error);
        localStorage.removeItem('takrawMatchId');
        localStorage.removeItem('takrawMatchData');
      }
    }
  }, []);

  return {
    matchData,
    matchId,
    history,
    createMatch,
    updateMatchData,
    recordEvent,
    undo,
    endSet,
    resetMatch
  };
};