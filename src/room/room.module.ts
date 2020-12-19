import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubjectModule } from 'src/subject/subject.module';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { roomsProviders } from './room.provider';
import { RoomService } from './room.service';

@Module({
  imports: [DatabaseModule, UserModule, SubjectModule],
  controllers: [RoomController],
  providers: [...roomsProviders, RoomService],
  exports: [RoomService]
})
export class RoomModule { }
