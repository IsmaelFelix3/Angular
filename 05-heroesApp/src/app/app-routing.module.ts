import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( modulo => modulo.HeroesModule)
  },
  {
    // en pocas palabras cuando alguien entre al path auth carga sus hijos y esos hijos o ese modulo hijo
    // van a venir del producto del auth.module
    // cuando se carge en memoria entonces el modulo que va a regresar (la promesa) es el authModule
    path: 'auth',
    // esto es una promesa
    // lazy load
    loadChildren: () => import('./auth/auth.module').then( modulo => modulo.AuthModule) 

    // simplemente le digo aqui mediante este path esta es la ruta que tienen el auth y
    //  hay vas a desplegar todas las rutas que yo defini
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
