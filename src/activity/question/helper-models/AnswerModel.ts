import { ApiProperty } from '@nestjs/swagger';

export class AnswerModel {

	@ApiProperty()
	content: string;

	@ApiProperty()
	value: number;
}