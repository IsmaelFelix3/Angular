import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
// el switch map es uno de los operadores de transformacion que te permite recibir un observable
// y regresar otro observable
import { switchMap } from "rxjs/operators";

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

    // aqui tenemos acceso al observableen el cual estan los parametros
    // me suscribi al observable params
    this.activatedRoute.params
    //en el pipe puedo yo puedo especificar cualquier cantidad de operadores que van a trabajar con el producto 
    // de este observable  this.activatedRoute.params
    .pipe(
      // esto tiene que retornar un observable, voy a poner el return implicito por eso no uso llaves
      // el swith map lo que va a hacer es recibir el valor del observable anterior (params) y
      // debe de retornar un nuevo observable entonces esto hace ese switch
      // en lugar de retornar el observable this.activatedRoute.params va a retornar este 
      // this.paisService.getPaisPorAlpha(params.id) y por eso el resp no se cambia ya que ya es la respuesta del segundo observavle
      //ahora la repsuesta es el objeto porque ese es el producto de este observable 
      // this.paisService.getPaisPorAlpha(params.id)
      switchMap((params) => this.paisService.getPaisPorAlpha(params.id) )
    )
    .subscribe(resp => {
      console.log(resp);
    });

    // el activated route viene con todo lo necesario para subscribirnos a cualquier cambio del url y lo hacemos asi
    // // se podria hacer asi o podriamos usar la desestructuracion
    // this.activatedRoute.params
    // .subscribe( /*params*/  ({id}) =>{
    //   console.log(id);
    //   // y ahora tengo que subscribirme de nuevo para obtener esta info
    //   this.paisService.getPaisPorAlpha(id)
    //   .subscribe(pais => {
    //     console.log(pais);
    //   })
    // })
    //de donde se le agrego el id, nosotros lo definimos en el archivo routing ('pais/:id')
    // el nombre que le pongamos despues del slash en el routing es como lo vamos a recibir en los params 
  }

}
