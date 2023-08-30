import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formData: any[] = [];
  private answersData: any[] = [];

  save(data: any) {
    this.formData.push(data);
  }

  getAll() {
    return this.formData;
  }

  saveAnswers(answers: any) {
    this.answersData = answers;
  }

  getAnswers() {
    return this.answersData;
  }
}
