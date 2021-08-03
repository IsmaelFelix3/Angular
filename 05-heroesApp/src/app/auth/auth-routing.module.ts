import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    // los childrens son las rutas hijas que el path va a tener
    // aqui si definimos estrictamente las rutas que vamos a ocupar
    // esto pondra un segmento
    children: [
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'registro',
        component: RegistroComponent
      },
      {
        path:'**',
        redirectTo: 'login'

      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
