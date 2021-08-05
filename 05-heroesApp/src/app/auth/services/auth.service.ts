import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Auth } from '../interfaces/auth.interface';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// el tap es utilizado para generar efectos secundarios, es decir cuando se haga esta peticion antes de llegar
// al subscribe va a pasar por el tap

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth
  {
    return {...this._auth! }
  }

  constructor(private http: HttpClient) { }

// el tap siempre va a recibir el producto del operador anterior 
  login()
  {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('token', auth.id)),
      );
  }

  verificaAutenticacion(): Observable<boolean>
  {
    // con el of se crea un observable
    if(!localStorage.getItem('token'))
    {
      return of(false);
    }

  // el operador map sirve para transformar lo que reciba del operador anterior o del obervable y trasnformalo
  // y asu ves retornar un nuevo valor (es como para transformar las cosas) 

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
                .pipe(
                      map( auth => {
                        this._auth = auth;
                        return true;
                      })
                    );
  }
}
