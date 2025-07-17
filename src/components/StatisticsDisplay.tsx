import React from 'react';
import { TrendingUp, Award, Shield, AlertTriangle } from 'lucide-react';
import { TeamStats, KeyPlayer } from '../types';

interface StatisticsDisplayProps {
  teamAStats: TeamStats;
  teamBStats: TeamStats;
  keyPlayers: { teamA: KeyPlayer; teamB: KeyPlayer };
}

export const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({
  teamAStats,
  teamBStats,
  keyPlayers
}) => {
  const statItems = [
    { label: 'ลูกฟาด', iconA: TrendingUp, iconB: TrendingUp, valueA: teamAStats.kills, valueB: teamBStats.kills },
    { label: 'เสิร์ฟเอซ', iconA: Award, iconB: Award, valueA: teamAStats.aces, valueB: teamBStats.aces },
    { label: 'บล็อก', iconA: Shield, iconB: Shield, valueA: teamAStats.blocks, valueB: teamBStats.blocks },
    { label: 'ข้อผิดพลาด', iconA: AlertTriangle, iconB: AlertTriangle, valueA: teamAStats.errors, valueB: teamBStats.errors },
    { label: '% ฟาดสำเร็จ', iconA: TrendingUp, iconB: TrendingUp, valueA: teamAStats.killPercentage, valueB: teamBStats.killPercentage }
  ];

  return (
    <div className="space-y-6">
      {/* Team Stats Comparison */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">เปรียบเทียบสถิติทีม</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl font-bold text-indigo-600">{item.valueA}</div>
                <div className="text-2xl font-bold text-pink-600">{item.valueB}</div>
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Players */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">ผู้เล่นฟอร์มเด่น</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[keyPlayers.teamA, keyPlayers.teamB].map((keyPlayer, index) => {
            if (!keyPlayer.player) {
              return (
                <div key={index} className="text-center text-gray-500">
                  ยังไม่มีผู้เล่นเด่น
                </div>
              );
            }
            
            const killPercentage = keyPlayer.player.killAttempts > 0 
              ? Math.round((keyPlayer.player.kills / keyPlayer.player.killAttempts) * 100) 
              : 0;

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  keyPlayer.teamKey === 'A' 
                    ? 'bg-indigo-50 border-indigo-200' 
                    : 'bg-pink-50 border-pink-200'
                }`}
              >
                <h4 className="font-bold text-lg mb-3">
                  {keyPlayer.player.name}
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({keyPlayer.teamName})
                  </span>
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>แต้มจากลูกฟาด:</span>
                    <span className="font-semibold">{keyPlayer.player.kills}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>% ฟาดสำเร็จ:</span>
                    <span className="font-semibold">{killPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>บล็อก:</span>
                    <span className="font-semibold">{keyPlayer.player.blocks}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};