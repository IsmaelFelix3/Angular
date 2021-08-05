import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';

// cuando importamos los enviroments usualmente se los trae de produccion
// pero nosotros no usaremos ese de produccion, cuando haga el build de produccion si va a tomar en enviroment de prod
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // observable que emite heroes
  getHeroes(): Observable<Heroe[]>
  {
    // ponemos la palabra return muy importante para que regrese un observable
     return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe>
  {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]>
  {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${ termino }&_limit=6`);
  }

  agregatHeroe(heroe: Heroe): Observable<Heroe>
  {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe>
  {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<any>
  {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }


  
}
