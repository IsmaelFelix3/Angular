import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";


// trabajaremos en base al elemento existencias
// el selector es una forma de decirle angular que lo bsuque o que utilice mi directiva personalizada en este caso es
// custom min  y se tiene que especificar de esta manera [customMin] y tambien tiene que estar asociado a un ngModel
// es decir solo se va a poder utilizar esta directiva  si le pusimos al elemtno un customMin y tiene un ngModel
// sino no va a entrar en nustra directiva

// las directivas deben ser incluidas en el modulo

// tambien necesitamos ponerle ciertas dependencias a esta directiva como por ejemplo providers, 
// y necesito especificar, en pocas palabras un provider es como un servicio , necesitamos especificar
// el servicio que necesito inyectar que en este caso seria el validator tambien

// NG_VALIDATORS esto tambien es algo que vamos a ocupar expandir

@Directive({
    selector: '[customMin]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})

// si quiero que esto extienda al formulario se tiene que implementar el implements validator
// el validator es un objeto que ya viene con angular para realizar este tipo de validaciones como el required
// el min length ese es el validator propiamente 
// vamos a extender una funcion del validator cuando tenga puesto esta directiva
export class CustomMinDirective implements Validator
{
    // necesitamos poder recibir el valor minimo
    @Input() minimo!: number;

    // validate es la funcion que tenemos que implementar 
    // obtenemos el control (el input)

    // el unico inconveniente es que el validate tiene que regresar algo , 
    // tene que regresar la validaciones como la habiamos visto que teniamos que regresar un objeto o un null
    // null es un tipo valido en el validate
   validate(control: FormControl)
   {
    const inputValue =  control.value;
    // vamos a regresar un objeto con el error caso contrario mandamos un null para decir que el error paso 
    // que no hay ningun error de validacion
    return (inputValue < this.minimo)
            ? {'customMin': true}
            : null;
   }
}