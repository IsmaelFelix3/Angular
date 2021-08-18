import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor 
{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
  // lng: number;
  // lat: number;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
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

      .list-group
      {
        /* para que siempre este fijo */
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  mapa!:mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-107.38512417862519, 24.829479255872428];

  @ViewChild('mapa') divMapa!: ElementRef;

  // arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit()
  {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // longitud y luego latitud siempre 
      center: this.center,
      zoom: this.zoomLevel
      });

      // en este punto el mapa ya esta listo y podemos inicair a leer los marcadores
      this.leerLocalStorage();

      // Personalizar marcadores
      // ejemplo de que se puede crear un elemento html y pintar en el mapa
      // se puede agregar una imagen o lo que sea.
      // const markerHtml: HTMLElement = document.createElement('div');
      // markerHtml.innerHTML = 'Holis';

      // new mapboxgl.Marker({element: markerHtml}).setLngLat(this.center).addTo(this.mapa);
       
      // new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa);

  }

  irMarcador(marker: mapboxgl.Marker)
  {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }
  

  agregarMarcador()
  {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    // la propiedad se dejo solo en color porque se iba a poner color: color pero eso como en ECmaScript6 es redundante
    // se obvia y se puede dejar solo uno
    const nuevoMarker = new mapboxgl.Marker({draggable: true,color}).setLngLat( this.center ).addTo(this.mapa);

    this.marcadores.push({
      color,
      marker:nuevoMarker
    });

    this.guardarMarcadoresLocalStorage();

    // no importa que este despues, no se van a disparar de manera simultanea 

    nuevoMarker.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })
  }

  guardarMarcadoresLocalStorage()
  {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( marker => {
      const color = marker.color;
      const { lng, lat } = marker.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng , lat ]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage()
  {
    if(!localStorage.getItem('marcadores'))
    {
      return;
    }

    const lgnLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lgnLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({color: m.color, draggable:true}).setLngLat(m.centro!).addTo(this.mapa);

      // recontruimos el arreglo de marcadores cuando lo leemos sino desaparece
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })

    })
  }

  borrarMarcador(index : number)
  {
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadoresLocalStorage();
  }
}
