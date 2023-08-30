import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, AbstractControl, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  questionForm!: FormGroup;
  reviewForm!: FormGroup;
  savedQuestions: any[] = [];

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.savedQuestions = this.formService.getAll();
    this.initReviewForm(); // Initialize review form after getting saved questions
  }

  initForm() {
    this.questionForm = this.fb.group({
      questionType: ['', Validators.required],
      questionText: ['', Validators.required],
      options: this.fb.array([this.createOption(), this.createOption()]),
      allowSpecifyOwn: [false],
      isRequired: [false]
    });
  }

  initReviewForm() {
    const group: any = {};

    this.savedQuestions.forEach((question, i) => {
        if (question.questionType === 'paragraph') {
            group[`question_${i}`] = [null, question.isRequired ? Validators.required : null];
        } else if (question.questionType === 'mcq') {
            // Apply the validator if the question is marked as required
            const validators = question.isRequired ? [this.atLeastOneCheckedValidator(1)] : [];
            const formArray = this.fb.array([], validators);
            question.options.forEach(() => {
                formArray.push(new FormControl(false));  // Initialize with false value for each option
            });
            group[`question_${i}`] = formArray;

            if (question.allowSpecifyOwn) {
                const otherControl = new FormControl(false);
                group[`other_${i}`] = otherControl;
                group[`description_${i}`] = [null];

                // Update the validators of the 'description' field based on 'other' checkbox value
                otherControl.valueChanges.subscribe(checked => {
                    const descriptionControl = this.reviewForm.get(`description_${i}`);
                    if (checked) {
                        descriptionControl?.setValidators(Validators.required);
                    } else {
                        descriptionControl?.clearValidators();
                    }
                    descriptionControl?.updateValueAndValidity();
                });
            }
        }
    });

    this.reviewForm = this.fb.group(group);
}


atLeastOneCheckedValidator(minRequired = 1): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!(control instanceof FormArray)) {
          return null;
      }
      const checkedCount = control.controls.filter(c => c.value).length;
      return checkedCount < minRequired ? { required: true } : null;
  };
}



  createOption(): FormControl {
    return this.fb.control('', Validators.required);
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(): void {
    if (this.options.length < 5) {
      this.options.push(this.createOption());
    }
  }

  removeOption(index: number): void {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onQuestionTypeChange(): void {
    if (this.questionForm.value.questionType !== 'mcq') {
      while (this.options.length !== 0) {
        this.options.removeAt(0);
      }
    } else {
      while (this.options.length < 2) {
        this.options.push(this.createOption());
      }
    }
  }

  onSubmit() {
    this.questionForm.markAllAsTouched();

    if (this.questionForm.valid) {
      this.formService.save(this.questionForm.value);
      this.initForm();
      this.closeModal();
      this.savedQuestions = this.formService.getAll();
      this.initReviewForm();
    }
  }

  closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  resetFormAndCloseModal(): void {
    this.initForm();
  }

  reviewAnswers() {
    Object.keys(this.reviewForm.controls).forEach(field => {
      const control = this.reviewForm.get(field);
      console.log(field, control?.status);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.reviewForm.valid) {
      console.log('Review successful!');
    }
  }
}
