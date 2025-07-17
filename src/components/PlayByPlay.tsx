import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { PlayByPlayEntry } from '../types';

interface PlayByPlayProps {
  entries: PlayByPlayEntry[];
}

export const PlayByPlay: React.FC<PlayByPlayProps> = ({ entries }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [entries]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">ลำดับเหตุการณ์</h3>
      </div>
      
      <div 
        ref={containerRef}
        className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-2"
      >
        {[...entries].reverse().map((entry, index) => (
          <div
            key={index}
            className={`text-sm p-3 rounded-lg ${
              entry.teamKey === 'A' 
                ? 'bg-indigo-100 border-l-4 border-indigo-500' 
                : entry.teamKey === 'B'
                ? 'bg-pink-100 border-l-4 border-pink-500'
                : 'bg-gray-200 border-l-4 border-gray-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-semibold text-gray-800">[{entry.score}]</span>
              <span className="text-xs text-gray-500">
                {new Date(entry.timestamp).toLocaleTimeString('th-TH')}
              </span>
            </div>
            <p className="mt-1 text-gray-700">{entry.text}</p>
          </div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            ยังไม่มีเหตุการณ์ในการแข่งขัน
          </div>
        )}
      </div>
    </div>
  );
};