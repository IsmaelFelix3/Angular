import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

// providedIn: 'root' caracteriztica que añadieron en la version 4 de angular 
// la cual permite que los servicios puedan estar definidos en el momento que se contruye el bundle de la app
// al especificar el provided in root en el decorador le dice a angular que no en que parte de su app sea que este
// este servicio va a ser unico y de manera global en el root , porque evita que se tenga que especificar en los 
// providers , si se especificia en un provider solo va a funcionar en ese modulo , pero como esta con este propiedad
// provided in root entonces angular lo va a elevar a un nivel global en la applicacion, y eso es lo que usualmente 
// eso es lo que nosotros queremos con nuestros servicios que sean globales y por consecuencia eso esta bien que ya lo haga
// por nosotros
@Injectable({
  providedIn: 'root'
})
export class GifsService 
{
  private  apiKey: string = 'Dr3X3jjND5Hc6zPh5tdjTvDqZMD7ILJ9';
  private _historial: string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  //asi lo hice yo
  // private respaldo: string = '';

  constructor(private http: HttpClient) 
  {
    if(localStorage.getItem('historial'))
    {
      // estas dos lineas son equivalentes
      // si esto regresa null entonces regresa un arreglo vacio
       this._historial = JSON.parse(localStorage.getItem('historial')!) || []

      //  asi lo hico fernando, guardo otro key resultados y eso se lo asigno a resultados que se recorre en
      // el componente resultado
       this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

      //  asi lo hice yo
      //  this.respaldo = this._historial[0];
      //  if(this.respaldo)
      //  {
      //    this.buscarGifs(this.respaldo);
      //  }

      // esta es otra forma de hacerlo
      // le voy a decir a ts confia en mi yo se lo que estoy haciendo con este signo de admiracion al final
       //this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
  }

  get historial()
  {
    // rompemos la referencia con el operador spread y asi regresamos un nuevo arreglo
    return [...this._historial];
  }

  buscarGifs(query: string = '')
  {
    // evitar que se graben vacios
    if(query.trim().length === 0)
    {
      return;
    }

    query= query.trim().toLowerCase();
   
    // nueva funcionalidad ecmaScript includes
    // si no lo incluye lo agrego
    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);

      // obtener solo los primeros 10
      this._historial = this._historial.splice(0,10);

      // para guardar en el local storage no hace falta importar nada porque es propio de js
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    // js puro
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=Dr3X3jjND5Hc6zPh5tdjTvDqZMD7ILJ9&q=dragon ball z&limit=10')
    //   .then( resp => {
    //     resp.json().then(data => {
    //       console.log(data);
    //     })
    //   })

    // async await
    // se le pone async a la funcion buscar gifs
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=Dr3X3jjND5Hc6zPh5tdjTvDqZMD7ILJ9&q=dragon ball z&limit=10')
    // const data = await resp.json();
    // console.log(data);

    // console.log(this._historial);


    // por lo general el observable tiene mayor control que la promesa
    // el subscribe es muy parecido al then, el subscribe se va a ejecutar cuando tengamos la resolucion de este get


    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    // se aconseja que se coloque el tipo en el get porque el get es de tipo generico
    // este get va a traer informacion que luce como la interfaz, le dice a ts hey la respuesta luce como esta interfaz
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params}) //se puede dejar solo params una ves ya que es redundante
    .subscribe( (resp ) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
    // esto retorna observable con ellos yo puedo añadir funcionalidades a al hora de hacer la peticion puedo mapear la respuesta 
    // puedo concatenar otras cosas, puedo hacer muchas manipulaciones
    // 

  }
  
  // para no crear duplicados

}
