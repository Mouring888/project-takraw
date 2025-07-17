import React from 'react';
import { Undo, Square, Sparkles, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onUndo: () => void;
  onEndSet: () => void;
  onGenerateSummary: () => void;
  onResetMatch: () => void;
  canUndo: boolean;
  summaryEnabled: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onEndSet,
  onGenerateSummary,
  onResetMatch,
  canUndo,
  summaryEnabled
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <Undo className="w-5 h-5" />
          ย้อนกลับ
        </button>
        
        <button
          onClick={onEndSet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <Square className="w-5 h-5" />
          จบเซต
        </button>
        
        <button
          onClick={onGenerateSummary}
          disabled={!summaryEnabled}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          สรุปเกมด้วย AI
        </button>
        
        <button
          onClick={onResetMatch}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          เริ่มแมตช์ใหม่
        </button>
      </div>
    </div>
  );
};