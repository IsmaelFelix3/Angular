import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  mat-card{
    margin-top:20px;
  }
`]
})
export class HeroeTarjetaComponent implements OnInit {

  // signo de admiracion quiere decir que siempre va a tener un heroe (confia en mi ts siempre vas a tener unvalor)
  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
