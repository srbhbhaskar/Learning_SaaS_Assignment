import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-answers',
  templateUrl: './review-answers.component.html',
  styleUrls: ['./review-answers.component.css']
})
export class ReviewAnswersComponent {
  answers: any[] = [];

  constructor(private formService: FormService, private router: Router) {
    this.answers = this.formService.getAnswers();
  }

  goBack() {
    this.router.navigate(['/form/builder']);
  }
}
