import { NgModule } from '@angular/core';

// este modulo solo me va a servir para exportar los modulos que ncesito utilizar
// es buena practiva ordenar los imports de manera alfabetica
// prime ng
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {FieldsetModule} from 'primeng/fieldset';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';

// modulo tonto lo unico que hace es exportar los modulos de prime ng para que el app module no se cargue demasiado 
// con modulos 

@NgModule({
 exports:[
   ButtonModule,
   CardModule,
   MenubarModule,
   FieldsetModule,
   ToolbarModule,
   TableModule
 ]
})
export class PrimeNgModule { }
