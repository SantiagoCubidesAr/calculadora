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
  isResultDisplayed: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  displayValue(value: string): void {
    if (this.isResultDisplayed) {
      try {
        this.calculatorService.validateExpression(this.result);
        this.display = value === '.' ? '0.' : value;
        this.display = this.result + value;
      } catch {
        this.display += value;
      }
      this.isResultDisplayed = false;
    } else {
      if (this.display === '0' && value === '.') {
        this.display = '0.';
      } else if (this.display === '0') {
        this.display = value;
      } else {
        this.display += value;
      }
    }
    this.updateResult();
  }

  clear(): void {
    this.display = '';
    this.result = '';
    this.isResultDisplayed = false;
  }

  deleteCharacter(): void {
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
    this.updateResult();
  }

  private removeZeros(expression: string): string {
    return expression.replace(/\b0+(\d+)/g, '$1');
  }

  calculate(): void {
    try {
      this.updateResult();
      this.display = this.result;
      this.isResultDisplayed = true;
    } catch (error: any) {
      this.result = error.message;
      this.isResultDisplayed = true;
    }
  }

  private updateResult(): void {
      const sanitizedExpression = this.removeZeros(this.display);
      const calculationResult = this.calculatorService.calculateExpression(sanitizedExpression);
      this.result = calculationResult.toString();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const validKeys = '0123456789+-*/.=()';
    if (validKeys.includes(event.key)) {
      if (event.key === '=') {
        this.calculate();
      } else {
        this.displayValue(event.key);
      }
    } else if (event.key === 'Backspace') {
      this.deleteCharacter();
    } else if (event.key === 'Enter') {
      this.calculate();
    } else if (event.key === 'Escape') {
      this.clear();
    }
  }
}
