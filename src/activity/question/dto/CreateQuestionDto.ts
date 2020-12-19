import { ApiProperty } from '@nestjs/swagger';
import { TopicModel } from 'src/activity/question/helper-models/TopicModel';
import { QuestionType } from '../enums/QuestionType';
import { AnswerModel } from '../helper-models/AnswerModel';

export class CreateQuestionDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	statement: string | any;

	@ApiProperty({ enum: Object.values(QuestionType) })
	type: number;

	@ApiProperty({ type: [AnswerModel] })
	answers: AnswerModel[];

	@ApiProperty({ type: [TopicModel] })
	topics: TopicModel[];
}