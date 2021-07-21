import { Component /*, OnInit*/ } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent /* implements OnInit*/ {
  
  //el contructor se ejecuta antes de la renderizacion
  //constructor() { }

  //ciclo de vida
  //los ciclos de vida y el contructor son metodos que dispara
  //angular de manera automatica

  //usualemnte el onInit se utiliza para inicializar cosas
  //Alguna peticion o servicio
  // ngOnInit(): void {
  // }

  heroes: string[] = ['Batman','Flash','Superman', 'Wonder Woman', 'Aquaman'];
  // heroeBorrado?: string = '';
  heroeBorrado: string = '';
  borrarHeroe(): void
  {
    //por si regresa undefined se asigna el or  || ''
    this.heroeBorrado = this.heroes.pop() || '';  
  }
}
