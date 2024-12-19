import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorScreenComponent } from './components/calculator-screen/calculator-screen.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { CalculatorOperatorsComponent } from './components/calculator-operators/calculator-operators.component';
import { FormsModule } from '@angular/forms';
import { CalculatorKeysComponent } from './components/calculator-keys/calculator-keys.component';

@NgModule({
  declarations: [
    CalculatorScreenComponent,
    CalculatorKeysComponent,
    CalculatorComponent,
    CalculatorOperatorsComponent
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
