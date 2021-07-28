import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

const routes: Routes = [
    {
        // configuracion de la ruta principal de la aplicacion 
        // primer componente a mostrar cuando se entre hay
        path: '',
        component: PorPaisComponent,
        // porque quiero que cuando no alla nada en la url caiga aqui
        pathMatch: 'full'
    },
    {
        path:'region',
        component: PorRegionComponent
    },
    {
        path: 'capital',
        component: PorCapitalComponent
    },
    {
        // si necesito que sea dinamico osea tomarlo como un argumento,
        // se le agrega dos puentos seguido del nombre de ese argumento que se le quiera dar
        // (: argumento), 
        path: 'pais/:id',
        component: VerPaisComponent
    },
    {
    // asterico *2 osea cualquier otro path que no sea de los de arriba
        path:'**',
        // entonces se va a redireccionar a el home
        // tambien se acostumbra poner un componente para mostrar un error personalizado
        // se deja vacio para redireccionar ala principal
        redirectTo: ''
    }
];

// decorador
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule 
{

}