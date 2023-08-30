import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full' ,redirectTo: 'form' },
  {
    path: 'form',
    loadChildren: () => import('../app/form-builder/form-builder.module').then(m => m.FormBuilderModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
