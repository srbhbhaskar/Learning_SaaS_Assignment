import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formData: any[] = [];

  save(data: any) {
    this.formData.push(data);
  }

  getAll() {
    return this.formData;
  }
}
