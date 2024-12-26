import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calculator-keys',
  templateUrl: './calculator-keys.component.html',
  styleUrls: ['./calculator-keys.component.css'],
})
export class CalculatorKeysComponent {
  @Output() keyPressed = new EventEmitter<string>();
  @Output() clearPressed = new EventEmitter<void>();
  @Output() calculatePressed = new EventEmitter<void>();
  @Output() deleteLastPressed = new EventEmitter<void>();

  sendKey(value: string): void {
    this.keyPressed.emit(value);
  }

  clear(): void {
    this.clearPressed.emit();
  }

  deleteCharacter(): void {
    this.deleteLastPressed.emit();
  }

  calculate(): void {
    this.calculatePressed.emit();
  }
}
