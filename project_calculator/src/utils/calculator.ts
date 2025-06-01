export const calculateResult = (
  a: number,
  b: number,
  operation: string
): number => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      if (b === 0) {
        return NaN; // Handle division by zero
      }
      return a / b;
    default:
      return b;
  }
};