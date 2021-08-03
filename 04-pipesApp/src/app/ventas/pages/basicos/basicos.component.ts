import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  nombreLower: string = 'ismael';
  nombreUpper: string = 'ISMAEL';
  nombreCompleto: string = 'isMaeL fElIx';

  fecha: Date = new Date();// dia de hoy
}
