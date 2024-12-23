import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorDisplayComponent } from './components/calculator-display/calculator-display.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { FormsModule } from '@angular/forms';
import { CalculatorKeysComponent } from './components/calculator-keys/calculator-keys.component';

@NgModule({
  declarations: [
    CalculatorDisplayComponent,
    CalculatorKeysComponent,
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
