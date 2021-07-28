import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// el of se importa del rxjs
// import { catchError } from "rxjs/operators";
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService 
{
  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  // poner el tipo no tranforma la info solo le dice a ts hey la informacion luce asi
  // esto significa que es un observable que emite un arreglo de paises
  buscarPais(termino:string): Observable<Country[]>
  {
    const url = `${this.apiUrl}/name/${termino}`;
    // se genera un observable con el of
    // aqui atrapa el error y devuelve un arreglo vacio
    // esto puede ser muy util y en algunos casos asi se maneja de esta manera
    // return this.http.get(url).pipe(
    //   catchError( err => of([]))
    // );

    // tambien se pone tipado al get porque es un generico
    return this.http.get<Country[]>(url);
  }

  buscarCapital( termino: string ): Observable<Country[]>
  {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisPorAlpha( id: string ): Observable<Country>
  {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
}
