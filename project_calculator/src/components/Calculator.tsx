import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import HistoryPanel from './HistoryPanel';
import { calculateResult } from '../utils/calculator';
import { CalculatorState, HistoryItem } from '../types';

const Calculator: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operation: null,
    overwrite: true,
    memory: '0',
    history: []
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/^[0-9]$/.test(key)) {
        handleDigitClick(key);
      } else if (key === '.') {
        handleDecimalClick();
      } else if (key === '+') {
        handleOperationClick('+');
      } else if (key === '-') {
        handleOperationClick('-');
      } else if (key === '*') {
        handleOperationClick('×');
      } else if (key === '/') {
        handleOperationClick('÷');
      } else if (key === 'Enter' || key === '=') {
        handleEqualsClick();
      } else if (key === 'Escape') {
        handleClearClick();
      } else if (key === 'Backspace') {
        handleBackspaceClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calculatorState]);

  const handleDigitClick = (digit: string) => {
    setCalculatorState((prevState) => {
      if (prevState.overwrite) {
        return {
          ...prevState,
          currentValue: digit,
          overwrite: false,
        };
      }
      
      if (prevState.currentValue === '0' && digit === '0') {
        return prevState;
      }
      
      if (prevState.currentValue === '0' && digit !== '0') {
        return {
          ...prevState,
          currentValue: digit,
        };
      }
      
      return {
        ...prevState,
        currentValue: prevState.currentValue + digit,
      };
    });
  };

  const handleDecimalClick = () => {
    setCalculatorState((prevState) => {
      if (prevState.overwrite) {
        return {
          ...prevState,
          currentValue: '0.',
          overwrite: false,
        };
      }
      
      if (prevState.currentValue.includes('.')) {
        return prevState;
      }
      
      return {
        ...prevState,
        currentValue: prevState.currentValue + '.',
      };
    });
  };

  const handleOperationClick = (operation: string) => {
    setCalculatorState((prevState) => {
      if (prevState.previousValue && prevState.operation && !prevState.overwrite) {
        const result = calculateResult(
          parseFloat(prevState.previousValue),
          parseFloat(prevState.currentValue),
          prevState.operation
        );
        
        return {
          ...prevState,
          previousValue: result.toString(),
          currentValue: result.toString(),
          operation: operation,
          overwrite: true,
        };
      }
      
      return {
        ...prevState,
        previousValue: prevState.currentValue,
        operation: operation,
        overwrite: true,
      };
    });
  };

  const handleEqualsClick = () => {
    setCalculatorState((prevState) => {
      if (!prevState.previousValue || !prevState.operation) {
        return prevState;
      }
      
      const result = calculateResult(
        parseFloat(prevState.previousValue),
        parseFloat(prevState.currentValue),
        prevState.operation
      );
      
      const newHistoryItem: HistoryItem = {
        expression: `${prevState.previousValue} ${prevState.operation} ${prevState.currentValue}`,
        result: result.toString(),
        timestamp: new Date()
      };
      
      return {
        ...prevState,
        previousValue: '',
        currentValue: result.toString(),
        operation: null,
        overwrite: true,
        history: [...prevState.history, newHistoryItem]
      };
    });
  };

  const handleClearClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      currentValue: '0',
      previousValue: '',
      operation: null,
      overwrite: true,
    }));
  };

  const handleAllClearClick = () => {
    setCalculatorState({
      currentValue: '0',
      previousValue: '',
      operation: null,
      overwrite: true,
      memory: '0',
      history: []
    });
  };

  const handleBackspaceClick = () => {
    setCalculatorState((prevState) => {
      if (prevState.overwrite) {
        return {
          ...prevState,
          currentValue: '0',
          overwrite: true,
        };
      }
      
      if (prevState.currentValue.length === 1) {
        return {
          ...prevState,
          currentValue: '0',
          overwrite: true,
        };
      }
      
      return {
        ...prevState,
        currentValue: prevState.currentValue.slice(0, -1),
      };
    });
  };

  const handlePercentageClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      currentValue: (parseFloat(prevState.currentValue) / 100).toString(),
    }));
  };

  const handleMemoryAddClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      memory: (parseFloat(prevState.memory) + parseFloat(prevState.currentValue)).toString(),
    }));
  };

  const handleMemorySubtractClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      memory: (parseFloat(prevState.memory) - parseFloat(prevState.currentValue)).toString(),
    }));
  };

  const handleMemoryRecallClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      currentValue: prevState.memory,
      overwrite: true,
    }));
  };

  const handleMemoryClearClick = () => {
    setCalculatorState((prevState) => ({
      ...prevState,
      memory: '0',
    }));
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="max-w-md w-full">
      <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
        <Display 
          value={calculatorState.currentValue}
          expression={calculatorState.operation 
            ? `${calculatorState.previousValue} ${calculatorState.operation}`
            : ''}
          toggleHistory={toggleHistory}
          showHistory={showHistory}
        />
        
        {showHistory ? (
          <HistoryPanel 
            history={calculatorState.history} 
            onClose={toggleHistory} 
            onClear={handleAllClearClick}
          />
        ) : (
          <Keypad 
            onDigitClick={handleDigitClick}
            onOperationClick={handleOperationClick}
            onEqualsClick={handleEqualsClick}
            onClearClick={handleClearClick}
            onAllClearClick={handleAllClearClick}
            onBackspaceClick={handleBackspaceClick}
            onDecimalClick={handleDecimalClick}
            onPercentageClick={handlePercentageClick}
            onMemoryAddClick={handleMemoryAddClick}
            onMemorySubtractClick={handleMemorySubtractClick}
            onMemoryRecallClick={handleMemoryRecallClick}
            onMemoryClearClick={handleMemoryClearClick}
          />
        )}
      </div>
    </div>
  );
};

export default Calculator;