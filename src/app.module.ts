import { Module } from '@nestjs/common';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { RoomModule } from './room/room.module';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { PerformanceMeshModule } from './performance-mesh/performance-mesh.module';
import { TopicModule } from './topic/topic.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		DatabaseModule,
		RoomModule,
		SubjectModule,
		ActivityModule,
		CoreModule,
		PerformanceMeshModule,
		TopicModule
	]
})
export class AppModule { }
