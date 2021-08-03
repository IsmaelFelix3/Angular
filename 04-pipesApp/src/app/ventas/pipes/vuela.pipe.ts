import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'vuela'
})
export class VuelaPipe implements PipeTransform
{
    // para recibir argumentos se separa por comas
    transform(valor: boolean):string
    {
        return (valor) ? 'vuela' : 'no vuela';
    }
}