import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateScheduledJobDto } from './dtos/create-scheduled-job.dto';
import { UpdateScheduledJobDto } from './dtos/update-scheduled-job.dto';
import { Job } from './entities/job';
import { ScheduledJob } from './entities/scheduled-job.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('schedule-jobs')
  getScheduledJobs(): Promise<ScheduledJob[]> {
    return this.appService.getScheduledJobs();
  }

  @Post('schedule-jobs')
  createScheduledJob(
    @Body() createScheduledJobDto: CreateScheduledJobDto,
  ): Promise<ScheduledJob> {
    return this.appService.createScheduledJob(createScheduledJobDto);
  }

  @Patch('schedule-jobs')
  async updateScheduledJob(
    @Body() updateScheduledJobDto: UpdateScheduledJobDto,
  ): Promise<ScheduledJob> {
    const scheduledJob = await this.appService.updateScheduledJob(
      updateScheduledJobDto,
    );

    if (scheduledJob === undefined) {
      throw new NotFoundException("Scheduled Job doesn't exist");
    }

    return scheduledJob;
  }

  @Delete('schedule-jobs/:id')
  async deleteScheduledJob(@Param('id') id: string): Promise<void> {
    const success = await this.appService.deleteScheduledJob(parseInt(id));

    if (!success) {
      throw new NotFoundException("Scheduled Job doesn't exist");
    }
  }

  @Get('jobs')
  getJobs(): Promise<Job[]> {
    return this.appService.getJobs();
  }
}
