import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  private readonly historyKey = 'calculator_history';

  roundDecimals(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  validateExpression(expression: string): void {

    if (!/^[\d+\-*/.() ]+$/.test(expression)) {
      throw new Error('Expresión no válida');
    }

    if (/\/0(?!\d)/.test(expression)) {
      throw new Error('División por cero no permitida');
    }

    if (/[\+\-\*\/]$/.test(expression)) {
      throw new Error('La expresión no puede terminar con un operador');
    }
  }

  calculateExpression(expression: string): number {
    const processedExpression = this.addImplicitMultiplication(expression);
    this.validateExpression(processedExpression);
    try{
      const result = eval(processedExpression);
      if (!isFinite(result)) {
        throw new Error('Resultado infinito o no válido');
      }
      return this.roundDecimals(result);
    } catch{
      throw new Error('Expresión no válida');
    }
  }

  private addImplicitMultiplication(expression: string): string {
    return expression.replace(/(\d)(\()/g, '$1*(');
  }

  saveToHistory(operation: string): void {
    const history = this.getHistory();
    history.push(operation);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  getHistory(): string[] {
    const history = localStorage.getItem(this.historyKey);
    return history ? JSON.parse(history) : [];
  }

  clearHistory(): void {
    localStorage.removeItem(this.historyKey);
  }
}
