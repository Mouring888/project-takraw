import React from 'react';
import { Team } from '../types';

interface ScoreboardProps {
  teamA: Team;
  teamB: Team;
  isDisplayView?: boolean;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ teamA, teamB, isDisplayView = false }) => {
  const baseClasses = isDisplayView 
    ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white" 
    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white";

  const scoreClasses = isDisplayView 
    ? "text-yellow-400" 
    : "text-white";

  return (
    <div className={`${baseClasses} p-6 rounded-2xl shadow-2xl mb-6`}>
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 truncate">
            {teamA.name}
          </h3>
        </div>
        
        <div className="px-8">
          <div className={`text-4xl md:text-6xl font-black ${scoreClasses} text-center`}>
            {teamA.score} - {teamB.score}
          </div>
          <div className="text-lg md:text-xl text-center mt-2 opacity-90">
            เซต: {teamA.setScore} - {teamB.setScore}
          </div>
        </div>
        
        <div className="flex-1 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 truncate">
            {teamB.name}
          </h3>
        </div>
      </div>
    </div>
  );
};