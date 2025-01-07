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
  @Output() selectHistoryItem = new EventEmitter<string>();
  @Output() ItemClear= new EventEmitter<string>();

  onClearHistory(): void {
    this.clearHistory.emit();
  }

  itemSelected(entry: string) {
    this.selectHistoryItem.emit(entry);
  }

  onClearItem(item: string) {
    this.ItemClear.emit(item);
  }
}
