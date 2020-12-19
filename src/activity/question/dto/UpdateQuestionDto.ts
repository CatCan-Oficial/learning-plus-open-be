import { ApiProperty } from '@nestjs/swagger';
import { AnswerModel } from '../helper-models/AnswerModel';
import { TopicModel } from '../helper-models/TopicModel';

export class UpdateQuestionDto {

	@ApiProperty()
	title: string;

	@ApiProperty()
	statement: string | any;

	@ApiProperty()
	type: number;

	@ApiProperty({ type: [AnswerModel] })
	answers: AnswerModel[];

	@ApiProperty({ type: [TopicModel] })
	topics: TopicModel[];
}