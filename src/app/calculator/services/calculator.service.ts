import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  private readonly historyKey = 'calculator_history';
  private storage: Storage = localStorage;

  private validateExpression(expression: string): void {

    if (!/^[\d+\-*/.() ]+$/.test(expression)) {
      throw new Error('Expresión no válida');
    }

    if (/\/0(?!\.|\d)/.test(expression)) {
      throw new Error('División por cero no permitida');
    }

    if (/[\+\-\*\/]$/.test(expression)) {
      throw new Error('La expresión no puede terminar con un operador');
    }
  }

  private addImplicitMultiplication(expression: string): string {
    return expression
    .replace(/(\d)(\()/g, '$1*(')
    .replace(/(\))(\d|\.)/g, '$1*$2')
    .replace(/(\.)(\()/g, '$1*$2')
  }

  processAndValidate(expression: string): string {
    const processedExpression = this.addImplicitMultiplication(expression);
    this.validateExpression(processedExpression);
    return processedExpression;
  }

  roundDecimals(value: number): number {
    return Math.abs(value) < 1e15 ? parseFloat(value.toFixed(2)) : value;
  }

  calculateExpression(expression: string): number {
    const processedExpression = this.processAndValidate(expression)
    try {
      const result = Function(`"use strict"; return (${processedExpression})`)();
      if (!isFinite(result)) {
        throw new Error('Resultado infinito o no válido');
      }
      return this.roundDecimals(result);
    } catch (error) {
      throw new Error('Expresión no válida');
    }
  }

  saveToHistory(operation: string): void {
    const history = this.getHistory();
    history.push(operation);
    this.storage.setItem(this.historyKey, JSON.stringify(history));
  }

  getHistory(): string[] {
    const history = this.storage.getItem(this.historyKey);
    return history ? JSON.parse(history) : [];
  }

  clearHistory(): void {
    this.storage.removeItem(this.historyKey);
  }

  setStorageEngine(storage: Storage): void {
    this.storage = storage;
  }
}
