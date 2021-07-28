import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit
{
  @Input() placeholder: string = '';
  // se necesita emitir este termino
  // es importante siempre definir el tipo de evento que va a emitir, en este caso es el termino
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  // este se emitira cuando la persona deje de escribir
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // el subject es un observable por decirlo asi  
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit()
  {
    // como es un observable se pueden usar operadores de rxjs que ayudan a realizar esta tarea del debouncer
    this.debouncer
    .pipe(
      // cuantas milesimas de segundo esperar antes de emitir el siguiente valor, practicamente le digo
      //  no emitas el subscribe hasta que este observable deje de emitir valor por los proximos 300 milisegundos 
      // 
      debounceTime(300)
    )
    .subscribe( valor => {
      this.onDebounce.emit(valor);
    })
  }

  buscar()
  {
    this.onEnter.emit(this.termino);
    // subcribe para subcribirme a sus valores que emite
    // es un observable especial
  }

  // se puede mandar el evento o no , lo quito en el ejemplo
  // teclaPresionada( event: any )
  // {
  //   const valor = event.target.value;
  //   console.log(valor);

  //   console.log(this.termino);
  // }

  teclaPresionada()
  {
    // el next esta suscrito en el subscribe, va a recibir el nuevo valor 
    this.debouncer.next(this.termino);
  }
  constructor() { }
}
