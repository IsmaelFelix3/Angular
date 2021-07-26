import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent
{

  // lo que hace el view child es que va y busca en el html a un elemeto que tenga una referencia local 
  // llamada #txtBuscar y lo va a asignar a este elemento (txtbuscar)
  
  //typescript me dice que el elemento puede que no exista este elemento seguro que deseas hacerlo, y yo le digo a ts confia en mi
  // ese elemento siempre va a tener algo y le voy a poner un signo de admiracion ! el cual se conoce como non-null assertion operator
  // o un operador para asegurarse de que el objeto no es nulo esto es propio de ts no de js
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  // se especifica el tipado de elementref parar indicarle que va a ser de tipo html input element

  // para usar el servicio necesitamos inyectarlo
  // basicamente para inyectar esto es todo crear una propiedad y listo
  constructor(  private gifsService: GifsService  )
  {}

  buscar()
  {
    const valor = this.txtBuscar.nativeElement.value;
    
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
  }
  

}
