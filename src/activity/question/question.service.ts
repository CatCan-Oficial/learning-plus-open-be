import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseService from 'src/core/services/base.service';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { UpdateQuestionDto } from './dto/UpdateQuestionDto';
import { Question } from './schemas/Question';

@Injectable()
export class QuestionService extends BaseService<Question, CreateQuestionDto, UpdateQuestionDto> {
	constructor(
		@Inject('QUESTION_MODEL')
		model: Model<Question>
	) { super('Questão', model) }
}
