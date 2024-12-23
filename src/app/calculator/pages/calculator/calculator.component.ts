import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  display: string = '';

  constructor(private calculatorService: CalculatorService) {}

  displayValue(value: string): void {
    this.display += value;
  }

  clear(): void {
    this.display = '';
  }

  calculate(): void {
    try {
      const [a, operator, b] = this.parseInput(this.display);
      const Result = this.calculatorService.Operation(a, b, operator);

      if (typeof Result === 'number') {
        this.display = this.calculatorService
          .roundingDecimals(Result)
          .toString();
      } else {
        this.display = Result;
      }
    } catch (error) {
      this.display = 'Entrada Invalida';
    }
  }

  parseInput(input: string): [number, string, number] {
    const match = input.match(/(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/);
    if (!match) {
      throw new Error('Invalid input format');
    }
    const [, num1, operator, num2] = match;
    return [parseFloat(num1), operator, parseFloat(num2)];
  }
}