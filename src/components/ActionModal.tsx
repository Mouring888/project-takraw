import React from 'react';
import { X } from 'lucide-react';
import { Team } from '../types';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string, playerIndex?: number) => void;
  team: Team;
  actionType: 'point' | 'error';
  title: string;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onAction,
  team,
  actionType,
  title
}) => {
  if (!isOpen) return null;

  const pointActions = [
    { text: 'ฟาดสำเร็จ (Kill)', type: 'kill' },
    { text: 'เสิร์ฟเอซ (Ace)', type: 'ace' },
    { text: 'บล็อกได้แต้ม (Block)', type: 'block' },
    { text: 'คู่ต่อสู้ทำพลาด (Opponent Error)', type: 'oppError' }
  ];

  const errorActions = [
    { text: 'เสิร์ฟเสีย', type: 'serveFault' },
    { text: 'ฟาดเสีย (ติดเน็ต/ออก)', type: 'attackError' }
  ];

  const actions = actionType === 'point' ? pointActions : errorActions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => onAction(action.type)}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1 ${
                action.type === 'oppError' 
                  ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};