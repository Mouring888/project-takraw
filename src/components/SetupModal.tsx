import React, { useState } from 'react';
import { X, Users, Trophy } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onSubmit: (matchData: {
    teamA: { name: string; players: string[] };
    teamB: { name: string; players: string[] };
  }) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ isOpen, onSubmit }) => {
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [teamAPlayers, setTeamAPlayers] = useState(['', '', '']);
  const [teamBPlayers, setTeamBPlayers] = useState(['', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamAName && teamBName && teamAPlayers.every(p => p.trim()) && teamBPlayers.every(p => p.trim())) {
      onSubmit({
        teamA: { name: teamAName, players: teamAPlayers },
        teamB: { name: teamBName, players: teamBPlayers }
      });
    }
  };

  const updateTeamAPlayer = (index: number, value: string) => {
    const newPlayers = [...teamAPlayers];
    newPlayers[index] = value;
    setTeamAPlayers(newPlayers);
  };

  const updateTeamBPlayer = (index: number, value: string) => {
    const newPlayers = [...teamBPlayers];
    newPlayers[index] = value;
    setTeamBPlayers(newPlayers);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-800">ตั้งค่าการแข่งขัน</h2>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 text-lg">กรุณาใส่ชื่อทีมและผู้เล่นเพื่อเริ่มบันทึกสถิติ</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Team A Setup */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="text-xl font-semibold text-indigo-800">ทีม A</h3>
              </div>
              
              <input
                type="text"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                placeholder="ชื่อทีม A"
                className="w-full p-3 border border-indigo-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
              
              <div className="space-y-3">
                {['ผู้เล่น 1 (ตัวฟาด)', 'ผู้เล่น 2 (ตัวชง)', 'ผู้เล่น 3 (ตัวเสิร์ฟ)'].map((label, index) => (
                  <input
                    key={index}
                    type="text"
                    value={teamAPlayers[index]}
                    onChange={(e) => updateTeamAPlayer(index, e.target.value)}
                    placeholder={label}
                    className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                ))}
              </div>
            </div>
            
            {/* Team B Setup */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-pink-600" />
                <h3 className="text-xl font-semibold text-pink-800">ทีม B</h3>
              </div>
              
              <input
                type="text"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                placeholder="ชื่อทีม B"
                className="w-full p-3 border border-pink-300 rounded-lg mb-4 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                required
              />
              
              <div className="space-y-3">
                {['ผู้เล่น 1 (ตัวฟาด)', 'ผู้เล่น 2 (ตัวชง)', 'ผู้เล่น 3 (ตัวเสิร์ฟ)'].map((label, index) => (
                  <input
                    key={index}
                    type="text"
                    value={teamBPlayers[index]}
                    onChange={(e) => updateTeamBPlayer(index, e.target.value)}
                    placeholder={label}
                    className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                    required
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              เริ่มการแข่งขัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};