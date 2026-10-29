import { Routes } from '@angular/router';
import { Tracker } from './tracker/tracker';

export const routes: Routes = [
  { path: '', component: Tracker, title: 'Job Tracker' },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats').then((m) => m.Stats),
    title: 'Stats',
  },
  { path: '**', redirectTo: '' },
];