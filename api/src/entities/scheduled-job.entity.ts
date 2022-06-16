import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduledJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scheduleType: string;

    @Column()
    executionTime: Date;

    @Column()
    message: string;
}