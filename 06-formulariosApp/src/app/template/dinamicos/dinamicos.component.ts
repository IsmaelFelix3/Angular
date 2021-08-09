import { Component} from '@angular/core';

import { NgForm } from "@angular/forms";

interface Persona 
{
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito 
{
  id: number;
  nombre: String;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent
{

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Ismael',
    favoritos: [
      { id: 1, nombre: 'Halo' },
      { id: 2, nombre: 'Resident Evil' }
    ]
  }

  guardar()
  {
    console.log('Formulario posteado');
  }

  agregarJuego()
  {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    // mandamos esto como un nuevo objeto con el operador spread para esparcir todas sus propiedades y asi de esta manera
    // siempre asegurarme de que no voy a mandar ninguna referencia al objeto
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index: number)
  {
    // this.persona.favoritos.pop();
    // cuantos elementos quiero borrar 1
     this.persona.favoritos.splice(index, 1);
  }

}
