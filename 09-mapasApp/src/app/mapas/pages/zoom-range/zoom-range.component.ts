import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container{
        width: 100%;
        height:100%;
      }

      .row
      {
        background-color: white;
        border-radius: 5px;
        position: fixed;
        bottom:50px;
        left:50px;
        padding: 10px;
        z-index: 999;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  // despues de que la vista alla sido inicializada
  
  mapa!:mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-107.38512417862519, 24.829479255872428];

  // el view child sirve para tomar un elemento html y utilizarlo como una propiedad comun y corriente 
  // busca por referencia local
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() {}

  ngOnDestroy()
  {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void 
  {
    console.log('After View Init',this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // longitud y luego latitud siempre 
      center: this.center,
      zoom: this.zoomLevel
      });

    // para obtener el valor actual y preciso del zoom en el mapa necesito poner un event lister que me ayude a indicar
    // cuando el zoom cambia
    // para crear un listener es con el metodo on 
    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (event) => {
      if(this.mapa.getZoom() > 18)
      {
        this.mapa.zoomTo(18);
      }
    });

    // el original event es el evento html de la pagina que se esta disparando y el target ya es propiamente el evento
    // del map box 

    this.mapa.on('move', (event) => {
      const target  = event.target;
      const {lng,lat}  = target.getCenter();
      this.center = [lng,lat];
    })
  }

  zoomIn()
  {
    this.mapa.zoomIn();

    
  }

  zoomOut()
  {
    this.mapa.zoomOut();
    
  }

  zoomCambio(valor: string)
  {
    this.mapa.zoomTo( Number(valor) )
  }
  

}
