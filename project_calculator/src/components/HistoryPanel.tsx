import React from 'react';
import { Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClose: () => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClose, onClear }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gray-50 h-80 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700">Calculation History</h2>
        <button
          onClick={onClear}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Clear history"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No calculation history yet
          </div>
        ) : (
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li 
                key={index} 
                className="bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="text-xs text-gray-400 mb-1">{formatTime(item.timestamp)}</div>
                <div className="text-gray-600">{item.expression}</div>
                <div className="text-lg font-medium text-gray-800">{item.result}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;