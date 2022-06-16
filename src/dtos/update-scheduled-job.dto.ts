import { ApiProperty } from '@nestjs/swagger';
import { ScheduledJobType } from 'src/entities/scheduled-job.entity';

export class UpdateScheduledJobDto {
  @ApiProperty()
  id: number;
  @ApiProperty({ enum: Object.values(ScheduledJobType) })
  scheduleType: ScheduledJobType;
  @ApiProperty()
  executionTime: Date;
  @ApiProperty()
  message: string;
  completed: boolean;
}
