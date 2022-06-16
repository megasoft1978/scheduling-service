import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateScheduledJobDto } from './dtos/create-scheduled-job.dto';
import { UpdateScheduledJobDto } from './dtos/update-scheduled-job.dto';
import { ScheduledJob } from './entities/scheduled-job.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  createScheduledJob(@Body() createScheduledJobDto: CreateScheduledJobDto): Promise<ScheduledJob> {
    return this.appService.createScheduledJob(createScheduledJobDto);
  }

  @Patch()
  async updateScheduledJob(@Body() updateScheduledJobDto: UpdateScheduledJobDto): Promise<ScheduledJob> {
    const scheduledJob = await this.appService.updateScheduledJob(updateScheduledJobDto);

    if (scheduledJob === undefined) {
      throw new NotFoundException('Scheduled Job doesn\'t exist');
    }

    return scheduledJob;
  }

  @Delete(':id')
  async deleteScheduledJob(@Param('id') id: string): Promise<void> {
    const success = await this.appService.deleteScheduledJob(parseInt(id));

    if (!success) {
      throw new NotFoundException('Scheduled Job doesn\'t exist');
    }
  }
}
