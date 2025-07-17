import React from 'react';
import { Target, AlertTriangle, Users } from 'lucide-react';
import { Team } from '../types';

interface TeamControlsProps {
  team: Team;
  teamKey: 'A' | 'B';
  onAction: (teamKey: 'A' | 'B', action: 'point' | 'error') => void;
}

export const TeamControls: React.FC<TeamControlsProps> = ({ team, teamKey, onAction }) => {
  const teamColors = teamKey === 'A' 
    ? { bg: 'bg-indigo-50', border: 'border-indigo-200', button: 'bg-indigo-600 hover:bg-indigo-700' }
    : { bg: 'bg-pink-50', border: 'border-pink-200', button: 'bg-pink-600 hover:bg-pink-700' };

  return (
    <div className={`${teamColors.bg} p-6 rounded-xl shadow-lg ${teamColors.border} border-2`}>
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => onAction(teamKey, 'point')}
          className={`w-full ${teamColors.button} text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2`}
        >
          <Target className="w-5 h-5" />
          +1 แต้ม
        </button>
        
        <button
          onClick={() => onAction(teamKey, 'error')}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <AlertTriangle className="w-5 h-5" />
          ทำเสีย (Error)
        </button>
      </div>
    </div>
  );
};