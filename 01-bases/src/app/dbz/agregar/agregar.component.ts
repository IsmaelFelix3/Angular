import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent 
{
  @Input() nuevo: Personaje = {
    nombre: '',
    poder: 0
  } ;

  //sele puede poner un alias dentro de los parentesis si no se le pone nada toma el nombre de la propiedad, 
  // ese sera el nombre del evento que nosotros vamos a exponer
  //se debe agregar el event emitter del angualr core
  // @Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();

  constructor(private dbzService: DbzService)
  {

  }

  agregar()
  {
    if(this.nuevo.nombre.trim().length === 0){ return;}

    //no marca error porque el this.nuevo satisface los valores de la interface del personaje
    //ya que tenemos la info es el momento para emitir el evento
    // this.onNuevoPersonaje.emit( this.nuevo );

    // console.log(this.nuevo);

    // this.personajes.push({nombre: this.nuevo.nombre, poder: this.nuevo.poder});
    // this.personajes.push(this.nuevo);

    this.dbzService.agregarPersonaje(this.nuevo);

    this.nuevo = {
      nombre: '',
      poder: 0
    }
  }

}
