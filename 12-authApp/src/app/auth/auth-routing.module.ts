import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';
import { RegisterComponent } from 'src/app/auth/pages/register/register.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
