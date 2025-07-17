import React, { useState } from 'react';
import { Trophy, Users, Monitor } from 'lucide-react';
import { SetupModal } from './components/SetupModal';
import { Scoreboard } from './components/Scoreboard';
import { TeamControls } from './components/TeamControls';
import { ActionModal } from './components/ActionModal';
import { PlayerSelectionModal } from './components/PlayerSelectionModal';
import { GameControls } from './components/GameControls';
import { StatisticsDisplay } from './components/StatisticsDisplay';
import { PlayByPlay } from './components/PlayByPlay';
import { AIFeatures } from './components/AIFeatures';
import { useMatchData } from './hooks/useMatchData';
import { calculateTeamStats, findKeyPlayers } from './utils/matchUtils';
import { generateMatchSummary, generateCoachAnalysis } from './utils/aiUtils';

type ViewMode = 'statistician' | 'display';

function App() {
  const { matchData, matchId, history, createMatch, recordEvent, undo, endSet, resetMatch, updateMatchData } = useMatchData();
  const [viewMode, setViewMode] = useState<ViewMode>('statistician');
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    teamKey: 'A' | 'B';
    actionType: 'point' | 'error';
    title: string;
  }>({
    isOpen: false,
    teamKey: 'A',
    actionType: 'point',
    title: ''
  });
  const [playerModal, setPlayerModal] = useState<{
    isOpen: boolean;
    teamKey: 'A' | 'B';
    subAction: string;
    isOpponentError: boolean;
  }>({
    isOpen: false,
    teamKey: 'A',
    subAction: '',
    isOpponentError: false
  });

  const handleSetupSubmit = (setupData: { teamA: { name: string; players: string[] }; teamB: { name: string; players: string[] } }) => {
    createMatch(setupData.teamA, setupData.teamB);
  };

  const handleTeamAction = (teamKey: 'A' | 'B', action: 'point' | 'error') => {
    if (!matchData) return;
    
    const team = teamKey === 'A' ? matchData.teamA : matchData.teamB;
    const title = action === 'point' 
      ? `ทีม ${team.name} ได้แต้มจาก?`
      : `ทีม ${team.name} ทำพลาดจากอะไร?`;

    setActionModal({
      isOpen: true,
      teamKey,
      actionType: action,
      title
    });
  };

  const handleActionModalAction = (actionType: string) => {
    if (!matchData) return;

    const teamKey = actionModal.teamKey;
    const opponentTeamKey = teamKey === 'A' ? 'B' : 'A';

    if (actionType === 'ace' || actionType === 'serveFault') {
      // For ace and serveFault, we need to select a player
      setPlayerModal({
        isOpen: true,
        teamKey: actionType === 'ace' ? teamKey : teamKey,
        subAction: actionType,
        isOpponentError: false
      });
    } else if (actionType === 'oppError') {
      // For opponent errors, select from opponent team
      setPlayerModal({
        isOpen: true,
        teamKey: opponentTeamKey,
        subAction: 'error',
        isOpponentError: true
      });
    } else {
      // For kill, block, attackError - select from acting team
      setPlayerModal({
        isOpen: true,
        teamKey,
        subAction: actionType,
        isOpponentError: false
      });
    }
    
    setActionModal(prev => ({ ...prev, isOpen: false }));
  };

  const handlePlayerSelect = (playerIndex: number) => {
    recordEvent(
      playerModal.teamKey,
      playerModal.subAction,
      playerIndex,
      playerModal.isOpponentError
    );
    setPlayerModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleEndSet = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการจบเซตนี้?')) {
      endSet();
    }
  };

  const handleResetMatch = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าจะเริ่มแมตช์ใหม่? ข้อมูลปัจจุบันจะหายไป')) {
      resetMatch();
    }
  };

  const handleGenerateSummary = async () => {
    if (!matchData) return;
    
    const playLog = matchData.playByPlay.map(p => `[${p.score}] ${p.text}`);
    const summary = await generateMatchSummary(playLog);
    
    const updatedMatchData = { ...matchData, matchSummary: summary };
    updateMatchData(updatedMatchData);
  };

  const handleGenerateCoachAnalysis = async () => {
    if (!matchData) return;
    
    const stats = calculateTeamStats(matchData);
    const analysis = await generateCoachAnalysis(stats);
    
    const updatedMatchData = { ...matchData, coachAnalysis: analysis };
    updateMatchData(updatedMatchData);
  };

  // If no match data, show setup modal
  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto p-4 max-w-7xl">
          <header className="text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">Takraw Stat Tracker</h1>
            </div>
            <p className="text-lg text-gray-600">โปรแกรมเก็บสถิติตะกร้อแบบเรียลไทม์</p>
          </header>
          
          <SetupModal
            isOpen={true}
            onSubmit={handleSetupSubmit}
          />
        </div>
      </div>
    );
  }

  const teamStats = calculateTeamStats(matchData);
  const keyPlayers = findKeyPlayers(matchData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Takraw Stat Tracker</h1>
                <p className="text-sm text-gray-600">โปรแกรมเก็บสถิติตะกร้อแบบเรียลไทม์</p>
              </div>
            </div>
            {matchId && (
              <div className="text-xs text-gray-500">
                Match ID: <span className="font-mono font-semibold">{matchId.substring(0, 8)}</span>
              </div>
            )}
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
            <button
              onClick={() => setViewMode('statistician')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'statistician'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              สำหรับผู้จดสถิติ
            </button>
            <button
              onClick={() => setViewMode('display')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'display'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Monitor className="w-5 h-5" />
              จอแสดงผลสำหรับผู้ชม
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main>
          {viewMode === 'statistician' ? (
            <div className="space-y-6">
              {/* Scoreboard */}
              <Scoreboard teamA={matchData.teamA} teamB={matchData.teamB} />
              
              {/* Team Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TeamControls
                  team={matchData.teamA}
                  teamKey="A"
                  onAction={handleTeamAction}
                />
                <TeamControls
                  team={matchData.teamB}
                  teamKey="B"
                  onAction={handleTeamAction}
                />
              </div>
              
              {/* Game Controls */}
              <GameControls
                onUndo={undo}
                onEndSet={handleEndSet}
                onGenerateSummary={handleGenerateSummary}
                onResetMatch={handleResetMatch}
                canUndo={history.length > 0}
                summaryEnabled={matchData.playByPlay.length >= 5}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Display Scoreboard */}
              <Scoreboard teamA={matchData.teamA} teamB={matchData.teamB} isDisplayView />
              
              {/* AI Features */}
              <AIFeatures
                matchSummary={matchData.matchSummary}
                coachAnalysis={matchData.coachAnalysis}
                onGenerateSummary={handleGenerateSummary}
                onGenerateCoachAnalysis={handleGenerateCoachAnalysis}
                summaryEnabled={matchData.playByPlay.length >= 5}
              />
              
              {/* Statistics Display */}
              <StatisticsDisplay
                teamAStats={teamStats.teamA}
                teamBStats={teamStats.teamB}
                keyPlayers={keyPlayers}
              />
              
              {/* Play by Play */}
              <PlayByPlay entries={matchData.playByPlay} />
            </div>
          )}
        </main>

        {/* Modals */}
        <ActionModal
          isOpen={actionModal.isOpen}
          onClose={() => setActionModal(prev => ({ ...prev, isOpen: false }))}
          onAction={handleActionModalAction}
          team={actionModal.teamKey === 'A' ? matchData.teamA : matchData.teamB}
          actionType={actionModal.actionType}
          title={actionModal.title}
        />

        <PlayerSelectionModal
          isOpen={playerModal.isOpen}
          onClose={() => setPlayerModal(prev => ({ ...prev, isOpen: false }))}
          onPlayerSelect={handlePlayerSelect}
          team={playerModal.teamKey === 'A' ? matchData.teamA : matchData.teamB}
        />
      </div>
    </div>
  );
}

export default App;