import React, { useState } from 'react';
import { Sparkles, Brain, Loader2 } from 'lucide-react';

interface AIFeaturesProps {
  matchSummary?: string;
  coachAnalysis?: string;
  onGenerateSummary: () => Promise<void>;
  onGenerateCoachAnalysis: () => Promise<void>;
  summaryEnabled: boolean;
}

export const AIFeatures: React.FC<AIFeaturesProps> = ({
  matchSummary,
  coachAnalysis,
  onGenerateSummary,
  onGenerateCoachAnalysis,
  summaryEnabled
}) => {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [coachLoading, setCoachLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      await onGenerateSummary();
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateCoachAnalysis = async () => {
    setCoachLoading(true);
    try {
      await onGenerateCoachAnalysis();
    } finally {
      setCoachLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AI Match Summary */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">สรุปภาพรวมการแข่งขันโดย AI</h3>
        </div>
        
        {summaryLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <p className="ml-3 text-gray-600">กำลังสร้างสรุป...</p>
          </div>
        ) : (
          <div className="h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {matchSummary ? (
              <div className="text-sm text-gray-700 leading-relaxed">
                {matchSummary.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                กดปุ่มด้านล่างเพื่อสร้างสรุปการแข่งขันด้วย AI
              </p>
            )}
          </div>
        )}
        
        <button
          onClick={handleGenerateSummary}
          disabled={!summaryEnabled || summaryLoading}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {summaryLoading ? 'กำลังสร้าง...' : 'สร้างสรุป AI'}
        </button>
      </div>

      {/* AI Coach Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-teal-600" />
          <h3 className="text-xl font-bold text-gray-800">บทวิเคราะห์จากโค้ช AI</h3>
        </div>
        
        {coachLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="ml-3 text-gray-600">AI กำลังวิเคราะห์...</p>
          </div>
        ) : (
          <div className="h-48 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {coachAnalysis ? (
              <div className="text-sm text-gray-700 leading-relaxed">
                {coachAnalysis.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                กดปุ่มด้านล่างเพื่อรับคำแนะนำจากโค้ช AI
              </p>
            )}
          </div>
        )}
        
        <button
          onClick={handleGenerateCoachAnalysis}
          disabled={coachLoading}
          className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {coachLoading ? 'กำลังวิเคราะห์...' : 'ขอคำแนะนำ'}
        </button>
      </div>
    </div>
  );
};