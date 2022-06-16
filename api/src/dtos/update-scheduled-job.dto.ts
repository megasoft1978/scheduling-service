import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduledJobDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    scheduleType: string;
    @ApiProperty()
    executionTime: Date;
    @ApiProperty()
    message: string;
}
