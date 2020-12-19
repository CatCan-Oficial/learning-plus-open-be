import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SubjectController } from './subject.controller';
import { subjectsProviders } from './subject.provider';
import { SubjectService } from './subject.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectController],
  providers: [...subjectsProviders, SubjectService],
  exports: [SubjectService]
})
export class SubjectModule { }
