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

  loadHistory(): void {
    this.history = this.calculatorService.getHistory();
  }

  displayValue(value: string): void {
    if (this.isResult) {
      try {
        this.calculatorService.validateExpression(this.result);
        this.display = value === '.' ? '0.' : value;
        this.display = this.result + value;
      } catch {
        this.display += value;
      }
      this.isResult = false;
    } else {
      if (value === '.') {
        const currentNumber = this.display.split(/[-+*/()]+/).pop();
        if (currentNumber && currentNumber.includes('.')) {
          return;
        }
      }
      if ((value === '*' || value === '/') && this.display.length === 0) {
        return;
      } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (this.display && (this.display.charAt(this.display.length - 1) === '+' || this.display.charAt(this.display.length - 1) === '-' || this.display.charAt(this.display.length - 1) === '*' || this.display.charAt(this.display.length - 1) === '/')) {
          this.display = this.display.slice(0, -1) + value;
        } else {
          this.display += value;
        }
      } else {
        if (this.display === '0' && value === '.') {
          this.display = '0.';
        } else if (this.display === '0') {
          this.display = value;
        } else {
          this.display += value;
        }
      }
    }
    this.updateResult();
  }

  clear(): void {
    this.display = '';
    this.result = '';
    this.isResult = false;
  }

  deleteCharacter(): void {
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
    this.updateResult();
  }

  private removeZeros(expression: string): string {
    return expression.replace(/\b0+(\d+)/g, '$1');
  }

  finalResult(): void {
    try {
      this.updateResult();
      const operation = `${this.display} = ${this.result}`;
      this.calculatorService.saveToHistory(operation);
      this.history.push(operation);
      this.display = this.result;
      this.isResult = true;
    } catch (error: any) {
      this.result = error.message;
      this.isResult = true;
    }
  }

  private updateResult(): void {
      const Expression = this.removeZeros(this.display);
      const calculationResult = this.calculatorService.calculateExpression(Expression);
      this.result = calculationResult.toString();
  }

  selectHistoryItem(item: string): void {
    const [expression] = item.split(' = ');
    this.display = expression;
    this.isResult = false;
    this.updateResult();
  }

  ItemClear(item: string) {
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
