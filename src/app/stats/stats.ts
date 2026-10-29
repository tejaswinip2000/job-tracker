import { Component, inject } from '@angular/core';
import { JobStore } from '../job-store';
import { JobStatus, STATUSES } from '../job.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.html',
})
export class Stats {
  store = inject(JobStore);
  statuses = STATUSES;

  percent(status: JobStatus) {
    const s = this.store.stats();
    return s.total ? (s.byStatus[status] / s.total) * 100 : 0;
  }
}