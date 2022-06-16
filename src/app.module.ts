import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Job } from './entities/job';
import { ScheduledJob } from './entities/scheduled-job.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      entities: [ScheduledJob, Job],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ScheduledJob]),
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
