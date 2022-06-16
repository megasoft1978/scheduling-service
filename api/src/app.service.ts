import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduledJobDto } from './dtos/create-scheduled-job.dto';
import { UpdateScheduledJobDto } from './dtos/update-scheduled-job.dto';
import { Job } from './entities/job';
import { ScheduledJob } from './entities/scheduled-job.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ScheduledJob)
    private scheduledJobRepository: Repository<ScheduledJob>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) { }

  createScheduledJob(createScheduledJobDto: CreateScheduledJobDto): Promise<ScheduledJob> {
    return this.scheduledJobRepository.save({
      scheduleType: createScheduledJobDto.scheduleType,
      executionTime: createScheduledJobDto.executionTime,
      message: createScheduledJobDto.message,
    });
  }

  async updateScheduledJob(updateScheduledJobDto: UpdateScheduledJobDto): Promise<ScheduledJob> {
    const result = await this.scheduledJobRepository.update(updateScheduledJobDto.id, updateScheduledJobDto);

    if (result.affected > 0) {
      return this.scheduledJobRepository.findOne({
        where: [{ id: updateScheduledJobDto.id }]
      });
    } else {
      return undefined;
    }
  }

  async deleteScheduledJob(id: number): Promise<boolean> {
    const result = await this.scheduledJobRepository.delete(id);
    return result.affected > 0;
  }
}
