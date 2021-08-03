import { Pipe, PipeTransform } from "@angular/core";

// decorador para decirle a angular ue esto es un pipe
// el name es el nombre del pipe
// todos los pipes necesitan implementar el pipe transform
// el pipe trasnform es el metodo que se va a ejecutar cuando alguien utilice el pipe
@Pipe({
    name: 'mayusculas'
})
export class MayusculasPipe implements PipeTransform
{
    // para recibir argumentos se separa por comas
    transform(valor: string, enMayusculas:boolean = true):string
    {
        // if(enMayusculas)
        // {
        //     return valor.toUpperCase();
        // }
        // else
        // {
        //     return valor.toLowerCase();
        // }

        return (enMayusculas) ? valor.toUpperCase() : valor.toLowerCase();
    }
}