import { Injectable, signal, computed, effect } from '@angular/core';
import { Job, JobStatus, STATUSES } from './job.model';

const KEY = 'jobs';

@Injectable({ providedIn: 'root' })
export class JobStore {
  private readonly _jobs = signal<Job[]>(this.load());
  readonly jobs = this._jobs.asReadonly();

  readonly filter = signal<JobStatus | 'All'>('All');
  readonly search = signal('');

  readonly filtered = computed(() => {
    const f = this.filter();
    const s = this.search().toLowerCase();
    return this._jobs().filter(
      (j) => (f === 'All' || j.status === f) && `${j.company} ${j.role}`.toLowerCase().includes(s),
    );
  });

  readonly stats = computed(() => {
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<JobStatus, number>;
    for (const j of this._jobs()) byStatus[j.status]++;
    return { total: this._jobs().length, byStatus };
  });

  constructor() {
    effect(() => localStorage.setItem(KEY, JSON.stringify(this._jobs())));
  }

  add(company: string, role: string) {
    const job: Job = {
      id: Date.now(),
      company,
      role,
      status: 'Applied',
      date: new Date().toISOString().slice(0, 10),
    };
    this._jobs.update((list) => [job, ...list]);
  }

  updateStatus(id: number, status: JobStatus) {
    this._jobs.update((list) => list.map((j) => (j.id === id ? { ...j, status } : j)));
  }

  remove(id: number) {
    this._jobs.update((list) => list.filter((j) => j.id !== id));
  }

  private load(): Job[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}