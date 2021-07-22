import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/dbz.interface";


@Injectable()
export class DbzService
{
    // orden usual de los servicios 
    // propiedades
    // getters y setters
    // el constructor
    // metodos

    // en los servicios podemos inyectar otros servicios
   

    private _personajes: Personaje[] = [
        {
          nombre: 'Goku',
          poder: 15000
        },
        {
          nombre: 'Vegeta',
          poder: 7500
        }
      ];

      get personajes(): Personaje[]
      {
        //   js todos los objetos son mandados por referencia 
        // para evirtar esa relacion con js se usa el operador spread osea separa cada uno de los elementos del arreglo
        // y create uno nuevo , esto rompe la referencia no es de angular pero es una buena practica de js
          return [...this._personajes];
      }

      constructor()
      {
      }

      agregarPersonaje(personaje:Personaje)
      {
        this._personajes.push(personaje);
      }

}