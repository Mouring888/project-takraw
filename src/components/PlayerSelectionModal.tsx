import React from 'react';
import { X, User } from 'lucide-react';
import { Team } from '../types';

interface PlayerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayerSelect: (playerIndex: number) => void;
  team: Team;
}

export const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
  isOpen,
  onClose,
  onPlayerSelect,
  team
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">เลือกผู้เล่น</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-3">
          {team.players.map((player, index) => (
            <button
              key={index}
              onClick={() => onPlayerSelect(index)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-1 flex items-center gap-3"
            >
              <User className="w-5 h-5" />
              {player.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};