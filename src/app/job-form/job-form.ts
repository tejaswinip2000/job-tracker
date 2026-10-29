import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobStore } from '../job-store';

@Component({
  selector: 'app-job-form',
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
})
export class JobForm {
  private fb = inject(FormBuilder);
  private store = inject(JobStore);

  form = this.fb.nonNullable.group({
    company: ['', [Validators.required, Validators.minLength(2)]],
    role: ['', [Validators.required, Validators.minLength(2)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { company, role } = this.form.getRawValue();
    this.store.add(company, role);
    this.form.reset();
  }
}