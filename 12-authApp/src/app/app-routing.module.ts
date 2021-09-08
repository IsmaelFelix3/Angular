import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanLoad } from '@angular/router';
import { ValidarTokenGuard } from 'src/app/guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    // en el arreglo van todos los guards por los que ncesita pasar para poder abrir la ruta 
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
