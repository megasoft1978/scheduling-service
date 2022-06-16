import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ScheduledJob } from './scheduled-job.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ScheduledJob, (scheduledJob) => scheduledJob.jobs, {
    onDelete: 'CASCADE',
  })
  jobSchedule: ScheduledJob;

  @Column()
  result: string;

  @Column()
  createdOn: Date;
}
