import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // el contructor es antes de que se inicialice
  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {
    // cuando el componente esta inicializado

    // el activated route viene con todo lo necesario para subscribirnos a cualquier cambio del url y lo hacemos asi
    // se podria hacer asi o podriamos usar la desestructuracion
    this.activatedRoute.params
    .subscribe( /*params*/  ({id}) =>{
      console.log(id);
      // y ahora tengo que subscribirme de nuevo para obtener esta info
      this.paisService.getPaisPorAlpha(id)
      .subscribe(pais => {
        console.log(pais);
      })
    })
    //de donde se le agrego el id, nosotros lo definimos en el archivo routing ('pais/:id')
    // el nombre que le pongamos despues del slash en el routing es como lo vamos a recibir en los params 
  }

}
