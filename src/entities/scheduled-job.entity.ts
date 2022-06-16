import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from './job';

@Entity()
export class ScheduledJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduleType: ScheduledJobType;

  @Column()
  executionTime: Date;

  @Column()
  message: string;

  @Column()
  completed: boolean;

  @OneToMany(() => Job, (job) => job.jobSchedule)
  jobs: Job[];
}

export enum ScheduledJobType {
  Immediate = 'Immediate',
  Future = 'Future',
  Weekly = 'Weekly',
  Daily = 'Daily',
}
