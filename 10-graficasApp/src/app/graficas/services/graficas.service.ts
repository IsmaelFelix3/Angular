import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GraficasService {

// siempre es bueno que cualquier peticion http la hagamos en un servicio
  constructor(private http: HttpClient) { }

  getUsuariosRedesSociales()
  {
    return this.http.get('http://localhost:3000/grafica');
  }

  getUsuariosRedesSocialesOptimo()
  {
    // lo paso por el pipe para tranformarlo
    // el map nos permite tomar la respuesta de un observable y retornar cualquier cosa que queramos
    return this.getUsuariosRedesSociales().
    pipe(
      delay(1500),
      map(data =>{
        const labels = Object.keys(data);
        const values = Object.values(data);
        return { labels, values };
      })
    );
  }
}
