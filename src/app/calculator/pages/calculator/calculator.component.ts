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

  constructor(private calculatorService: CalculatorService) {}

  displayValue(value: string): void {
    this.display += value;
    this.updateResult();
  }

  clear(): void {
    this.display = '';
    this.result = '';
  }

  deleteCharacter(): void {
    this.display = this.display.slice(0, -1);
    this.updateResult();
  }

  private removeZeros(expression: string): string {
    return expression.replace(/\b0+(\d+)/g, '$1');
  }
  
  calculate(): void {
    try {
<<<<<<< HEAD
      const [a, operator, b] = this.validation(this.display);
      const Result = this.calculatorService.Operation(a, b, operator);
=======
      const sanitizedExpression = this.removeZeros(this.display);
      this.result = this.calculatorService
        .calculateExpression(sanitizedExpression)
        .toString();
    } catch (error: any) {
      this.result = error.message;
    }
  }
  
  private updateResult(): void {
    try {
      const sanitizedExpression = this.removeZeros(this.display);
      this.result = this.calculatorService
        .calculateExpression(sanitizedExpression)
        .toString();
    } catch {
      this.result = '';
    }
  }
>>>>>>> 264cf24975e7b2b2f2350f524df7156c1614d294

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const validKeys = '0123456789+-*/.=()';
    if (validKeys.includes(event.key)) {
      if (event.key === '=') {
        this.calculate();
      } else {
        this.displayValue(event.key);
      }
    }else if (event.key === 'Backspace') {
      this.deleteCharacter();
    } else if (event.key === 'Enter') {
      this.calculate();
    } else if (event.key === 'Escape') {
      this.clear();
    }
  }
<<<<<<< HEAD

  validation(input: string): [number, string, number] {
    const converter = input.match(/(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/);
    if (!converter) {
      throw new Error('Formato Invalido');
    }
    const [, num1, operator, num2] =converter;
    return [parseFloat(num1), operator, parseFloat(num2)];
  }
=======
>>>>>>> 264cf24975e7b2b2f2350f524df7156c1614d294
}
