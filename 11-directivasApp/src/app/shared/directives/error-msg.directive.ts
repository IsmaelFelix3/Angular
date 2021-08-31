import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[error-msg]'
})
export class ErrorMsgDirective implements OnInit, OnChanges {

  private _color: string = 'green';
  private _mensaje: string = 'Este campo es requerido';

  htmlElement: ElementRef<HTMLElement>;

  // se le puede enviar un valor si no viene se pone el rojo por default
  @Input() set color( valor: string )
  {
    this._color = valor;
    this.setColor();
  }
  // @Input() mensaje: string = 'Default';
  @Input() set mensaje(mensaje: string)
  {
    this._mensaje = mensaje;
    this.setMensaje();
  }

  @Input() set valido( valor: boolean )
  {
    if( valor )
    {
      this.htmlElement.nativeElement.classList.add('hidden');
    }
    else
    {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  constructor( private el: ElementRef<HTMLElement> ) 
  { 
    // mantenemos la referencia al elemento
    this.htmlElement = el;
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    
  }

  ngOnInit()
  {
    this.setEstilo();
    this.setColor();
    this.setMensaje();

  }

  setEstilo(): void
  {
    this.htmlElement.nativeElement.classList.add('form-text');
  }

  setColor(): void
  {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setMensaje(): void
  {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  } 
}
