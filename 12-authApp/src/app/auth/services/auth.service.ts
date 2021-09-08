import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map,catchError,tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { authResponse, Usuario } from '../interfaces/interfaces';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario()
  {
    // desestructuramos por si en algun lugar accidentalmente manipulamos alguna propiedad del usuario
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login( email: string, password: string )
  {
    const url = `${this.baseUrl}/auth`;

    const body = { email, password }

    // Retornamos el observable
    return this.http.post<authResponse>(url, body)
    .pipe(
      // disparamos un efecto secundario con el tap, que realmente no hace nada mas que ejecutar el codigo 
      // que contenga antes de los siguientes operadores
      tap(resp => {
        if( resp.Ok )
        {
          localStorage.setItem('token', resp.token!);

          this._usuario = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      // el orden de los operadores de rx es critico ya que su orden es importante ya que se ejecutan en cascade
      // el map permite mutar la respuesta
      // agregamos el of para regresar un observable ya que el catcherror debe devolver un observable
      map( valid => valid.Ok),
      catchError( err => of(err.error.msg) )
    );
  }

  validarToken(): Observable<boolean>
  {
    const url = `${this.baseUrl}/auth/renew`;

    // si es nulo manda un string vacio
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<authResponse>( url, { headers } )
    .pipe(
      map( resp => {
        localStorage.setItem('token', resp.token!);

        this._usuario= {
          name: resp.name!,
          uid: resp.uid!
        }
        
        return resp.Ok;
      }),
      catchError( err  => of( false ) )
    );

  }

}
