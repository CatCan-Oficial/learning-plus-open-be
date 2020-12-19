import { ApiProperty } from '@nestjs/swagger';
import { AnswerModel } from '../../helper-models/AnswerModel';

export class AnswerDto {

	@ApiProperty()
	studentId: string;

	@ApiProperty()
	questionId: string;

	@ApiProperty()
	answer: AnswerModel;
}