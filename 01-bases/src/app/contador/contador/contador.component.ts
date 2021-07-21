//decorador para tranformar esta clase en un componente propio de angular
import { Component } from "@angular/core";

@Component({
    selector: 'app-contador',
    template: `

    <h1>{{titulo}}</h1>

    <h3>La base es: <strong>{{base}}</strong></h3>

    <!-- parentesis significa un evento es decir este va a disparar el evento click doble ckick -->
    <button (click)="acumular(base)">+ {{base}}</button>

    <span>{{numero}}</span>

    <button (click)="acumular(-base)">- {{base}}</button>

`
})
export class ContadorComponent
{
    public titulo: string = 'Contador App';
    numero: number = 10;
    base: number = 5;
  
    // sumar()
    // {
    //   this.numero +=1;
    // }
  
    // restar()
    // {
    //   this.numero -=1;
    // }
  
    acumular(valor: number)
    {
      this.numero += valor;
  
    }
}