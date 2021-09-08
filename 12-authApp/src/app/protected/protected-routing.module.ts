import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/protected/dashboard/dashboard.component';

const routes: Routes = [
  {
    // path que define el padre
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: '**', redirectTo:'' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
