export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';
export const STATUSES: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

export interface Job {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
  date: string;
}