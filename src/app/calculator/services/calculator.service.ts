import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  Operation(a: number, b: number, operator: string): number | string {
    try {
      switch (operator) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          if (b === 0) {
            throw new Error('División por cero no es permitida.');
          }
          return a / b;
        default:
          throw new Error('Operación Invalida.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Error desconocido';
    }
  }

  roundingDecimals(value: number): number {
    return parseFloat(value.toFixed(2));
  }
}