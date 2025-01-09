import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-display',
  templateUrl: './calculator-display.component.html',
  styleUrls: ['./calculator-display.component.css'],
})
export class CalculatorDisplayComponent implements AfterViewChecked{

  @ViewChild('operations') operationsDiv!: ElementRef;
  @Input() display: string = '';
  @Input() result: string = '';
  @Input() isResultDisplayed: boolean = false;

  FontSize(text: string): string {
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

  scrollToBottom(): void {
    const element = this.operationsDiv.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


}
