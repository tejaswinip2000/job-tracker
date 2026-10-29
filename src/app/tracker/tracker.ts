import { Component } from '@angular/core';
import { JobForm } from '../job-form/job-form';
import { JobList } from '../job-list/job-list';

@Component({
  selector: 'app-tracker',
  imports: [JobForm, JobList],
  template: `
    <app-job-form />
    <app-job-list />
  `,
})
export class Tracker {}