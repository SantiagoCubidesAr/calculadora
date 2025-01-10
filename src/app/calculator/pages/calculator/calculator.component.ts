import { Component, HostListener } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {

  display: string = '';
  result: string = '';
  isResult: boolean = false;
  history: string[] = [];
  showHistory: boolean = false;

  constructor(private calculatorService: CalculatorService) {
    this.history = this.calculatorService.getHistory();
  }

  toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  clearHistory(): void {
    this.calculatorService.clearHistory();
    this.history = [];
  }

  displayValue(value: string): void {
    if (this.isResult) {
      this.display = !isNaN(Number(value)) ? '' : this.result;
      this.isResult = false;
    }

    if (!this.isInvalidSequence(value)) {
      this.updateDisplay(this.display + value);
    }
  }

  private isInvalidSequence(value: string): boolean {
    if (value === '.') {
      const currentNumber = this.display.split(/[-+*/()]+/).pop();
      return currentNumber?.includes('.') ?? false;
    }
    if ((value === '*' || value === '/') && this.display.length === 0) {
      return true;
    }
    if (['+', '-', '*', '/'].includes(value) && this.isLastCharacterOperator()) {
      this.display = this.display.slice(0, -1) + value; // Sustituye el operador actual.
      return true;
    }
    return false;
  }

  private isLastCharacterOperator(): boolean {
    return /[\+\-\*\/]$/.test(this.display);
  }

  private updateDisplay(value: string): void {
    this.display = value;
    this.updateResult();
  }

  clear(): void {
    this.display = '';
    this.result = '';
    this.isResult = false;
  }

  deleteCharacter(): void {
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '';
  }

  private removeZeros(expression: string): string {
    return expression.replace(/\b0+(\d+)/g, '$1');
  }

  finalResult(): void {
    try {
      const expression = this.removeZeros(this.display);
      const calculationResult = this.calculatorService.calculateExpression(expression);
      const operation = `${this.display} = ${calculationResult}`;
      this.saveOperation(operation);
      this.updateDisplay(calculationResult.toString());
      this.isResult = true;
    } catch (error: any) {
      this.result = error.message;
      this.isResult = true;
    }
  }

  private updateResult(): void {
    const expression = this.removeZeros(this.display);
    try {
      if (!this.isLastCharacterOperator()) {
        const calculationResult = this.calculatorService.calculateExpression(expression);
        this.result = calculationResult.toString();
      } else {
        this.result = '';
      }
    } catch {
      this.result = '';
    }
  }

  private saveOperation(operation: string): void {
    this.calculatorService.saveToHistory(operation);  // Guardar en el servicio
    this.history.push(operation);  // Actualizar en memoria del componente
  }

  selectHistoryItem(item: string): void {
    const [expression] = item.split(' = ');
    this.updateDisplay(expression);
    this.isResult = false;
    this.showHistory = false
  }

  clearHistoryItem(item: string): void {
    this.calculatorService.removeFromHistory(item);  // Eliminar del servicio
    this.history = this.history.filter(operation => operation !== item);  // Eliminar de la memoria local del componente
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    switch (key) {
      case 'Enter':
      case '=':
        this.finalResult();
        break;
      case 'Backspace':
        this.deleteCharacter();
        break;
      case 'Escape':
        this.clear();
        break;
      default:
        if ('0123456789+-*/.()'.includes(key)) {
          this.displayValue(key);
        }
        break;
    }
  }
}
