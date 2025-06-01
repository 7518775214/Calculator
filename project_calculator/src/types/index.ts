export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  overwrite: boolean;
  memory: string;
  history: HistoryItem[];
}

export interface HistoryItem {
  expression: string;
  result: string;
  timestamp: Date;
}