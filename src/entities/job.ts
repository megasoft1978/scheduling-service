import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduledJobId: number;

  @Column()
  result: string;

  @Column()
  createdOn: Date;
}
