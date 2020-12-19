import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseService from 'src/core/services/base.service';
import { CreateSubjectDto } from './dto/CreateSubjectDto';
import { UpdateSubjectDto } from './dto/UpdateSubjectDto';
import { Subject } from './schemas/Subject';

@Injectable()
export class SubjectService extends BaseService<Subject, CreateSubjectDto, UpdateSubjectDto> {

	constructor(
		@Inject('SUBJECT_MODEL')
		model: Model<Subject>
	) { super('Matéria', model) }
}
