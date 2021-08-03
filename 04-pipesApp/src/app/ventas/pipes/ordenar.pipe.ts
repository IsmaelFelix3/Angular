import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/ventas.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  // operador rest si dejas los 3 puntos obtienes todos lo argumentos que se manden, si se quitan se toma solo el siguiente argumento
  transform(heroes: Heroe[], orderPor: string = 'sin valor'): Heroe[] {


    switch(orderPor)
    {
      // para cambiar el ascendete o el descendente se tiene que cambiar el 1 y -1 al reves
      case 'nombre':
        return heroes = heroes.sort((a,b) => (a.nombre > b.nombre) ? 1 : -1);

      case 'vuela':
        // ascendente
        return heroes = heroes.sort((a,b) => (a.vuela > b.vuela) ? -1 : 1);

      case 'color':
        // descendente
        return heroes = heroes.sort((a,b) => (a.color > b.color) ? 1 : -1);
      
      default:
        return heroes;
    }

    // lo que nosotros retornemos de un pipe en el tranform es lo que va a termiinar llegando a quien sea que lo utilice
    // , antes de la rendreizacion
  }

}
