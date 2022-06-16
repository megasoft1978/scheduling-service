import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduledJobDto {
    @ApiProperty()
    scheduleType: string;
    @ApiProperty()
    executionTime: Date;
    @ApiProperty()
    message: string;
}