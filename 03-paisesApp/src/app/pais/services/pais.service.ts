import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// el of se importa del rxjs
// import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService 
{
  private apiUrl: string = 'https://restcountries.eu/rest/v2';
  
  get httpParams()
  {
    // regreso directamente el objeto
    
    return new HttpParams().set('fields','name;capital;alpha2Code;flag;population')
  }

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
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  buscarCapital( termino: string ): Observable<Country[]>
  {
    const url = `${this.apiUrl}/capital/${termino}`;
    // y asi simplemente llamo a esta propiedad de la clase
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  getPaisPorAlpha( id: string ): Observable<Country>
  {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  buscarPorRegion(region: string): Observable<Country[]>
  {
  // este objeto literalmente me permite configurar los parametros de la url
  // depende mucho de la api en esta caso el key seria fields
  // se pueden establecer cuantos parametros se necesiten con el set
    // const params = new HttpParams().set('fields','name;capital;alpha2code;flag;population')
    const url = `${this.apiUrl}/region/${region}`;
    
    // aqui se agrega el params como un objeto 
    // en el ecmaScript 6 poner una propiedad cuyo valor es igual al nombre de la misma variable 
    // es redundante y se puede obviar ({params:params}))
    return this.http.get<Country[]>(url, {params: this.httpParams})
    .pipe(
      tap(console.log)
    );
  }
}
