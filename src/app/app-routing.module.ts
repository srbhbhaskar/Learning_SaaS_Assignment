import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReviewAnswersComponent } from './review-answers/review-answers.component';

const routes: Routes = [
  { path: 'form/builder', component: FormBuilderComponent },
  { path: 'form/answers', component: ReviewAnswersComponent },
  { path: '', redirectTo: '/form/builder', pathMatch: 'full' }, // This will redirect empty route to /form/builder
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
