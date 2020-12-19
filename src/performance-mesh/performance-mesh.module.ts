import { forwardRef, Module } from '@nestjs/common';
import { ActivityModule } from 'src/activity/activity.module';
import { DatabaseModule } from 'src/database/database.module';
import { RoomModule } from 'src/room/room.module';
import { activityStudentPerformancesProviders } from './activity-student-performance/activity-student-performance.provider';
import { PerformanceMeshController } from './performance-mesh.controller';
import { PerformanceMeshService } from './performance-mesh.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => ActivityModule), RoomModule],
  controllers: [PerformanceMeshController],
  providers: [...activityStudentPerformancesProviders, PerformanceMeshService],
  exports: [PerformanceMeshService]
})
export class PerformanceMeshModule { }
