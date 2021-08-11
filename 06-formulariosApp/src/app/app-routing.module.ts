import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'template',
    // lazy load
    // para cargar un modulo es loadChildren
    loadChildren:  () => import('./template/template.module').then( modulo => modulo.TemplateModule)
  },
  {
     
    path: 'reactive',
    // lazy load
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule)
  },
  {
    // aqui es el nombre de la carpeta? creo que si no cargo con validaciones
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( modulo => modulo.AuthModule)
  },
  {
    path:'prueba',
    loadChildren: () => import('./Prueba/prueba.module').then( modulo => modulo.PruebaModule)
  },
  {
    path: '**',
    redirectTo: 'template'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
