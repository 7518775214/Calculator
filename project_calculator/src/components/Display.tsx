import React from 'react';
import { History, X } from 'lucide-react';

interface DisplayProps {
  value: string;
  expression: string;
  toggleHistory: () => void;
  showHistory: boolean;
}

const Display: React.FC<DisplayProps> = ({ value, expression, toggleHistory, showHistory }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-right">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={toggleHistory}
          className="p-2 text-white hover:bg-white/10 rounded-full transition-colors duration-200"
          aria-label={showHistory ? "Close history" : "Show history"}
        >
          {showHistory ? (
            <X size={20} className="text-white" />
          ) : (
            <History size={20} className="text-white" />
          )}
        </button>
        <div className="text-white/80 text-sm h-6 overflow-hidden">
          {expression}
        </div>
      </div>
      <div className="font-semibold text-4xl md:text-5xl text-white overflow-hidden text-ellipsis">
        {value}
      </div>
    </div>
  );
};

export default Display;