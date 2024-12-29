import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-display',
  templateUrl: './calculator-display.component.html',
  styleUrls: ['./calculator-display.component.css'],
})
export class CalculatorDisplayComponent {
  @Input() display: string = '';
  @Input() result: string = '';
  @Input() isResultDisplayed: boolean = false;

  getDynamicFontSize(text: string): string {
    const baseSize = 24; 
    const maxLength = 15; 
    const minSize = 12; 
    const scaleFactor = 1; 

    const newSize =
      text.length > maxLength
        ? Math.max(baseSize - (text.length - maxLength) * scaleFactor, minSize)
        : baseSize;
  
    return `${newSize}px`;
  }
  
  
}
