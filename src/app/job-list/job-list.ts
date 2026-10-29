import { Component, inject } from '@angular/core';
import { JobStore } from '../job-store';
import { JobStatus, STATUSES } from '../job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.html',
})
export class JobList {
  store = inject(JobStore);
  statuses = STATUSES;

  onSearch(e: Event) {
    this.store.search.set((e.target as HTMLInputElement).value);
  }
  onFilter(e: Event) {
    this.store.filter.set((e.target as HTMLSelectElement).value as JobStatus | 'All');
  }
  onStatus(id: number, e: Event) {
    this.store.updateStatus(id, (e.target as HTMLSelectElement).value as JobStatus);
  }
}