import React from 'react';
import KeypadButton from './KeypadButton';
import { Trash2, ArrowLeft } from 'lucide-react';

interface KeypadProps {
  onDigitClick: (digit: string) => void;
  onOperationClick: (operation: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onAllClearClick: () => void;
  onBackspaceClick: () => void;
  onDecimalClick: () => void;
  onPercentageClick: () => void;
  onMemoryAddClick: () => void;
  onMemorySubtractClick: () => void;
  onMemoryRecallClick: () => void;
  onMemoryClearClick: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigitClick,
  onOperationClick,
  onEqualsClick,
  onClearClick,
  onAllClearClick,
  onBackspaceClick,
  onDecimalClick,
  onPercentageClick,
  onMemoryAddClick,
  onMemorySubtractClick,
  onMemoryRecallClick,
  onMemoryClearClick
}) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50">
      {/* First row */}
      <KeypadButton onClick={onMemoryClearClick} variant="function">MC</KeypadButton>
      <KeypadButton onClick={onMemoryRecallClick} variant="function">MR</KeypadButton>
      <KeypadButton onClick={onMemoryAddClick} variant="function">M+</KeypadButton>
      <KeypadButton onClick={onMemorySubtractClick} variant="function">M-</KeypadButton>

      {/* Second row */}
      <KeypadButton onClick={onAllClearClick} variant="action">
        <Trash2 size={18} />
      </KeypadButton>
      <KeypadButton onClick={onClearClick} variant="action">C</KeypadButton>
      <KeypadButton onClick={onPercentageClick} variant="action">%</KeypadButton>
      <KeypadButton onClick={() => onOperationClick('÷')} variant="operation">÷</KeypadButton>

      {/* Third row */}
      <KeypadButton onClick={() => onDigitClick('7')}>7</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('8')}>8</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('9')}>9</KeypadButton>
      <KeypadButton onClick={() => onOperationClick('×')} variant="operation">×</KeypadButton>

      {/* Fourth row */}
      <KeypadButton onClick={() => onDigitClick('4')}>4</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('5')}>5</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('6')}>6</KeypadButton>
      <KeypadButton onClick={() => onOperationClick('-')} variant="operation">-</KeypadButton>

      {/* Fifth row */}
      <KeypadButton onClick={() => onDigitClick('1')}>1</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('2')}>2</KeypadButton>
      <KeypadButton onClick={() => onDigitClick('3')}>3</KeypadButton>
      <KeypadButton onClick={() => onOperationClick('+')} variant="operation">+</KeypadButton>

      {/* Sixth row */}
      <KeypadButton onClick={onBackspaceClick} variant="action">
        <ArrowLeft size={18} />
      </KeypadButton>
      <KeypadButton onClick={() => onDigitClick('0')}>0</KeypadButton>
      <KeypadButton onClick={onDecimalClick}>.</KeypadButton>
      <KeypadButton onClick={onEqualsClick} variant="equals">=</KeypadButton>
    </div>
  );
};

export default Keypad;