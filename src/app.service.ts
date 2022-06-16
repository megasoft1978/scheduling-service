import { Injectable, Logger } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduledJobDto } from './dtos/create-scheduled-job.dto';
import { UpdateScheduledJobDto } from './dtos/update-scheduled-job.dto';
import { Job } from './entities/job';
import {
  ScheduledJob,
  ScheduledJobType,
} from './entities/scheduled-job.entity';
import { differenceInSeconds, differenceInMinutes } from 'date-fns';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(ScheduledJob)
    private scheduledJobRepository: Repository<ScheduledJob>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  @Interval(5000)
  async checkJobs() {
    const scheduleJobs = await this.scheduledJobRepository.find({
      where: {
        completed: false,
      },
    });

    const jobs = await this.jobRepository.find();

    const scheduledJobsFiltered = scheduleJobs.filter((scheduleJob) => {
      let ok = false;

      switch (scheduleJob.scheduleType) {
        case ScheduledJobType.Future:
          if (
            differenceInSeconds(scheduleJob.executionTime, new Date()) <= 10
          ) {
            if (
              jobs.filter(
                (job) =>
                  job.scheduledJobId === scheduleJob.id &&
                  differenceInMinutes(job.createdOn, new Date()) == 0,
              ).length === 0
            ) {
              ok = true;
            }
          }
          break;
        case ScheduledJobType.Weekly:
          break;
        case ScheduledJobType.Daily:
          break;
      }

      return ok;
    });

    scheduledJobsFiltered.forEach((scheduleJob) => {
      this.executeJob(scheduleJob);
    });
  }

  getScheduledJobs(): Promise<ScheduledJob[]> {
    return this.scheduledJobRepository.find();
  }

  async executeJob(scheduledJob: ScheduledJob) {
    const job = await this.jobRepository.save({
      scheduledJobId: scheduledJob.id,
      result: scheduledJob.message,
      createdOn: new Date(),
    });

    if (scheduledJob.scheduleType === ScheduledJobType.Future) {
      scheduledJob.completed = true;
      this.scheduledJobRepository.update(scheduledJob.id, scheduledJob);
    }

    this.logger.debug('Job executed: ' + JSON.stringify(job));
  }

  async createScheduledJob(
    createScheduledJobDto: CreateScheduledJobDto,
  ): Promise<ScheduledJob> {
    const scheduledJob = await this.scheduledJobRepository.save({
      scheduleType: createScheduledJobDto.scheduleType,
      executionTime: createScheduledJobDto.executionTime,
      message: createScheduledJobDto.message,
      completed: false,
    } as ScheduledJob);

    if (scheduledJob.scheduleType === ScheduledJobType.Immediate) {
      await this.executeJob(scheduledJob);
      scheduledJob.completed = true;
      await this.scheduledJobRepository.update(scheduledJob.id, scheduledJob);
    }

    return scheduledJob;
  }

  async updateScheduledJob(
    updateScheduledJobDto: UpdateScheduledJobDto,
  ): Promise<ScheduledJob> {
    const result = await this.scheduledJobRepository.update(
      updateScheduledJobDto.id,
      updateScheduledJobDto,
    );

    if (result.affected > 0) {
      return this.scheduledJobRepository.findOne({
        where: [{ id: updateScheduledJobDto.id }],
      });
    } else {
      return undefined;
    }
  }

  async deleteScheduledJob(id: number): Promise<boolean> {
    const result = await this.scheduledJobRepository.delete(id);
    return result.affected > 0;
  }

  getJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }
}
