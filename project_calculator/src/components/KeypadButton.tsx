import React from 'react';

interface KeypadButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operation' | 'equals' | 'action' | 'function';
}

const KeypadButton: React.FC<KeypadButtonProps> = ({
  children,
  onClick,
  variant = 'default'
}) => {
  const baseClasses = "flex items-center justify-center h-16 text-xl font-medium rounded-lg transition-all duration-150 active:scale-95 focus:outline-none";
  
  const variantClasses = {
    default: "bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200 shadow-sm",
    operation: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm",
    equals: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm",
    action: "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400 shadow-sm",
    function: "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300 shadow-sm text-sm"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default KeypadButton;