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
      const [a, operator, b] = this.validation(this.display);
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

  validation(input: string): [number, string, number] {
    const converter = input.match(/(\d+\.?\d*)([+\-*/])(\d+\.?\d*)/);
    if (!converter) {
      throw new Error('Formato Invalido');
    }
    const [, num1, operator, num2] =converter;
    return [parseFloat(num1), operator, parseFloat(num2)];
  }
}
