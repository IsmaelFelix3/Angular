import { Component} from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent {

// i18nSelect
  nombre: string = 'Ismael';
  genero: string = 'masculino';

  invitacionMapa = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  }

// i18nPlural
clientes: string[] = ['Maria','Pedro','Juan','Eduardo','Fernando'];
clientesMapa = {
  '=0':'no tenemos ningun cliente espenado.',
  '=1':'tenemos un cliente esperando.',
  '=2':'tenemos 2 clientes esperando',
  'other':'tenemos # clientes esperando'
  // el numeral # es la cantidad de elementos que quedan, el other es una palabra reservada para los demas escenarios
}

cambiarPersona()
{
  if(this.nombre == 'Ismael')
  {
    this.nombre = 'Denisse';
    this.genero = 'femenino';
  }
  else
  {
    this.nombre = 'Ismael';
    this.genero = 'masculino'
  }
}

eliminarPersona()
{
  this.clientes.pop();
}


//  key value pipe
// el key value pipe se utiliza cuando se necesita mostrat un objeto literal de js en el html o trabajar con sus propiedades
persona = {
  nombre: 'Ismael',
  edad: 26,
  direccion: 'Culiacan, Sinaloa'
}

// json pipe

  heroes = [
    {
      nombre: 'superman',
      vuela: true
    },
    {
      nombre: 'Batman',
      vuela: false
    },
    {
      nombre: 'Aquaman',
      vuela: false
    }
  ]

  // async pipe
  miObservable = interval(1000);
  valorPromesa = new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve('Fin de la promesa');
    },3500);
  });
}
