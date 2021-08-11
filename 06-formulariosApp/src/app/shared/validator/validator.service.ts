import { Injectable } from '@angular/core';
import { AbstractControl,FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  // tiene que estar de la a z min luego mayus y depues cualquier cantidad de caracteres para eso e+
public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

constructor() { }

noPuedeSerStrider( control: FormControl ): ValidationErrors | null
{
  const valor: string = control.value?.trim().toLowerCase();
  if(valor === 'strider')
  {
    // con que nosotros regresemos un objeto esto es considerado error
    return { noStrider: true };
  }
  // cuando nosotros regresamos null en una validacion siginifica que no hay ningun error
  return null;

}

// lo interesante de esto es como voy a recibir argumentos a una funcion que funciona como un validador , 
// recuerden que estas funciones solo se le va a mandar la referencia no se ejecutan entonces hay que asegurarse 
// de que ala hora de ejecutar la funcion regresemos una funcion

// marca error de obsoleto, este error lo resolvemos hablando sobre la informacion de aqui, el error es mas que nada 
// por el tipado
camposIguales( campo1: string, campo2: string )
{
  return ( formGroup: AbstractControl ): ValidationErrors | null => {
    const pass1 = formGroup.get(campo1)?.value;
    const pass2 = formGroup.get(campo2)?.value;

    console.log(pass1, pass2);

    if( pass1 !== pass2 )
    {
      // formGroup porque es la referencia a todo el formulario
      formGroup.get(campo2)?.setErrors({ noIguales: true });
      return { noIguales: true }
    }
    // esto purgaria cualquier otro error que tuviera el campo asi que hay que tener cuidado con este tipo de evaluaciones
    // 
    formGroup.get(campo2)?.setErrors(null);
    return null
  }
}

}
