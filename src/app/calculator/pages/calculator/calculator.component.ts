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
    this.loadHistory();
  }

  toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  clearHistory(): void {
    this.calculatorService.clearHistory();
    this.history = [];
  }

  private loadHistory(): void {
    this.history = this.calculatorService.getHistory();
  }

  displayValue(value: string): void {
    if (this.isResult) {
      if (isNaN(Number(this.result))) {
        this.isResult = false;
      } else {
        this.display = this.result;
        this.isResult = false;
        if(!isNaN(Number(value))){
          this.display = '';
        }
      }
    }
    if (this.isInvalidSequence(value)) {
      return;
    }
    this.updateDisplay(this.display + value);
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
    this.updateDisplay(this.display.length > 1 ? this.display.slice(0, -1) : '0');
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
    const calculationResult = this.calculatorService.calculateExpression(expression);
    this.result = calculationResult.toString();
  }

  private saveOperation(operation: string): void {
    this.calculatorService.saveToHistory(operation);
    this.history.push(operation);
  }

  selectHistoryItem(item: string): void {
    const [expression] = item.split(' = ');
    this.updateDisplay(expression);
    this.isResult = false;
  }

  clearHistoryItem(item: string): void {
    const index = this.history.indexOf(item);
    if (index !== -1) {
      this.history.splice(index, 1);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const validKeys = '0123456789+-*/.=()';
    if (validKeys.includes(event.key)) {
      if (event.key === '=') {
        this.finalResult();
      } else {
        this.displayValue(event.key);
      }
    } else if (event.key === 'Backspace') {
      this.deleteCharacter();
    } else if (event.key === 'Enter') {
      this.finalResult();
    } else if (event.key === 'Escape') {
      this.clear();
    }
  }
}
