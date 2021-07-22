import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent 
{

  //esto "definir una propiedad en la clase y asignarle un valor (la forma corta de definir propiedades en ts)"
  //esto se conoce como inyeccion de dependencias
  //estamos inyectando el servicio en el contructor si pero en este componente
  // constructor(private DbzService: DbzService)
  // {

  // }

  

  // get personajes(): Personaje[]
  // {
  //   return this.DbzService.personajes;
  // }

  // agregar( event: any)
  // {
  //   event.preventDefault();
  //   console.log('hey');
  // }

 

  nuevo: Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }

  // agregarNuevoPersonaje( argumento: Personaje )
  // {
  //   console.log(argumento);
  //   this.personajes.push(argumento);
  // }

}
