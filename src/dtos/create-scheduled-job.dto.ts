import { ApiProperty } from '@nestjs/swagger';
import { ScheduledJobType } from 'src/entities/scheduled-job.entity';

export class CreateScheduledJobDto {
  @ApiProperty({ enum: Object.values(ScheduledJobType) })
  scheduleType: ScheduledJobType;
  @ApiProperty()
  executionTime: Date;
  @ApiProperty()
  message: string;
}
