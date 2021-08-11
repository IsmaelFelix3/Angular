import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from "rxjs/operators";

// el map me permite poder trasnformar el valor que el observable esta emitiendo y 
// regresar cualquier otra cosa que yo quiera
@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
  // tiene que ser un servicio porque se necesita inyectar el modulo http 

  constructor(private http: HttpClient) { }

  // el validation errors no es mas que un objeto que tiene un true tipo { noIgual: true } y 
  // es que no tiene ningun error es que tiene un error si regresa un null
  validate(control: AbstractControl): Observable<ValidationErrors | null> 
  {
    const email = control.value;
    console.log(email);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`).pipe( delay(3000),
      // la respuesta siempre va a ser un arreglo la diferencia es que si el arreglo viene con algo significa que ese correo ya esta tomado
      // pero si reegreso un arreglo vacio significa que ese correo no se a tomado
      // estoy transformando el valor del observable en esto vvvvv
      map( resp => {
        return ( resp.length === 0 )? null : { emailTomado: true }
      })
    )
  }
}
