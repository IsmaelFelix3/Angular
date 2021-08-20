import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

import { Pais, paisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.eu/rest/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[]
  {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<paisSmall[]>
  {
    const url: string = `${this.baseUrl}/region/${region}?fields=alpha3Code;name`

    return this.http.get<paisSmall[]>(url);
  }

  getPaisPorCodigo(codigo : string): Observable<Pais | null>
  {
    if(!codigo)
    {
      // el of es para crear observables
      return of(null)
    }
    const url = `${this.baseUrl}/alpha/${codigo}`;

    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(codigo : string): Observable<paisSmall>
  {
  
    const url = `${this.baseUrl}/alpha/${codigo}?fields=alpha3Code;name`;

    return this.http.get<paisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<paisSmall[]>
  {
    if(!borders)
    {
      return of([]);
    }
    // pongo las llaves para que sea un arreglo de peticiones si las quito solo seria una peticion
    const peticiones:Observable<paisSmall>[] = [];

    // los observables para que se disparen tengo que poner el subscribe
    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    // rxjs tiene algo interesante que nos permite disparar todas las peticiones de manera simultanea
    // regresa un observable que contiene una arreglo con todo el producto de cada una de sus peticiones internas
    return combineLatest( peticiones );
  }
}
