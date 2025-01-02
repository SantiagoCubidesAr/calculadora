import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calculator-history',
  templateUrl: './calculator-history.component.html',
  styleUrl: './calculator-history.component.css'
})
export class CalculatorHistoryComponent {

  @Input() history: string[] = [];
  @Output() clearHistory = new EventEmitter<void>();
  @Output() closeHistory = new EventEmitter<void>();

  onClearHistory(): void {
    this.clearHistory.emit();
  }

  onCloseHistory(): void {
    this.closeHistory.emit();
  }
: 
  itemSelected(entry) {

  }

}
