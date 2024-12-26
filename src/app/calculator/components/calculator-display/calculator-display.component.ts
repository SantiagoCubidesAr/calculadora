import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-display',
  templateUrl: './calculator-display.component.html',
  styleUrls: ['./calculator-display.component.css'],
})
export class CalculatorDisplayComponent {
  @Input() display: string = '';
  @Input() result: string = ''; 
}