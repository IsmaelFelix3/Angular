import { FormControl } from '@angular/forms';

// tiene que estar de la a z min luego mayus y depues cualquier cantidad de caracteres para eso e+
export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


 export const noPuedeSerStrider = ( control: FormControl ) => {
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

 }


//   noPuedeSerStrider( control: FormControl )
//   {
//     const valor: string = control.value?.trim().toLowerCase();
//     if(valor === 'strider')
//     {
//       // con que nosotros regresemos un objeto esto es considerado error
//       return { noStrider: true };
//     }
//     // cuando nosotros regresamos null en una validacion siginifica que no hay ningun error
//     return null;

//   }