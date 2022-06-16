import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Job } from './entities/job';
import { ScheduledJob } from './entities/scheduled-job.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
