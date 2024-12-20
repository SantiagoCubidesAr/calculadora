import { Component } from '@angular/core';
import { Tecla } from '../../interfaces/calculator.interfaces';

@Component({
  selector: 'calculator-keys',
  templateUrl: './calculator-keys.component.html',
  styleUrl: './calculator-keys.component.css'
})
export class CalculatorKeysComponent {
  public teclas: Tecla[] = [
    { tipo: 'numero', valor: '1'},
    { tipo: 'numero', valor: '2'},
    { tipo: 'numero', valor: '3'},
    { tipo: 'numero', valor: '4'},
    { tipo: 'numero', valor: '5'},
    { tipo: 'numero', valor: '6'},
    { tipo: 'numero', valor: '7'},
    { tipo: 'numero', valor: '8'},
    { tipo: 'numero', valor: '9'},
    { tipo: 'numero', valor: '0'},
    { tipo: 'operador', valor: '+'},
    { tipo: 'operador', valor: '_'},
    { tipo: 'operador', valor: '/'},
    { tipo: 'operador', valor: '*'},
  ]
}
