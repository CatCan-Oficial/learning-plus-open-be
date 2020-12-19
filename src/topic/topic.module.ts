import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TopicController } from './topic.controller';
import { topicsProviders } from './topic.provider';
import { TopicService } from './topic.service';

@Module({
  imports: [DatabaseModule],
  providers: [...topicsProviders, TopicService],
  controllers: [TopicController],
  exports: [TopicService]
})
export class TopicModule { }
