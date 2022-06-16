import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

export enum ScheduledJobType {
  Immediate = 'Immediate',
  Future = 'Future',
  Weekly = 'Weekly',
  Daily = 'Daily',
}
