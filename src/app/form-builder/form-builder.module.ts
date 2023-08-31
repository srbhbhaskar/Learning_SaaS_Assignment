import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';
import { ReviewAnswersComponent } from './review-answers/review-answers.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', children: [
      {path:'' , redirectTo:'builder', pathMatch: 'full'},
      {path:'builder' , component:FormBuilderComponent},
      {path:'answers' , component:ReviewAnswersComponent}

    ]
  },
]

@NgModule({
  declarations: [
    FormBuilderComponent,
    ReviewAnswersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    FormBuilderComponent,
    ReviewAnswersComponent
  ]
})
export class FormBuilderModule { }
