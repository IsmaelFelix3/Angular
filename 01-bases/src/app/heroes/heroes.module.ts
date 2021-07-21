//
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HeroeComponent } from './heroe/heroe.component';
import { ListadoComponent } from './listado/listado.component';

@NgModule({
    //las declaraciones basicamente dicen que cosas contiene este modulo por ejemplo
    // que componentes, que pipes que otras cosas
    declarations:[
        HeroeComponent,
        ListadoComponent
    ],
    //que cosas quiero que sea visibles afuera de este modulo
    exports: [
        ListadoComponent
    ],
    //cuando miren la palabra importas significa que aqui adentro van modulos
    //comunmente son solo modulos los que se colacan en los imports
    // modulo significa que va aqui
    imports: [

        //si nestamos usando el ngif o ngfor se va a necesitar importar el comon module
        //ya que ofrece las directivas como el ngif o nngfor etc
         CommonModule
    ]
})
export class HeroesModule
{

}