import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PerformanceMeshModule } from 'src/performance-mesh/performance-mesh.module';
import { RoomModule } from 'src/room/room.module';
import { TopicModule } from 'src/topic/topic.module';
import { UserModule } from 'src/user/user.module';
import { ActivityController } from './activity.controller';
import { activitiesProviders } from './activity.provider';
import { ActivityService } from './activity.service';
import { questionsProviders } from './question/question.provider';
import { QuestionService } from './question/question.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => PerformanceMeshModule), RoomModule, TopicModule, UserModule],
  controllers: [ActivityController],
  providers: [...activitiesProviders, ...questionsProviders, ActivityService, QuestionService],
  exports: [ActivityService]
})
export class ActivityModule { }
