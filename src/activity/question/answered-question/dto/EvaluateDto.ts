import { ApiProperty } from '@nestjs/swagger';

export class EvaluateDto {

	@ApiProperty()
	questionId: string;

	@ApiProperty()
	answeredCorrectly: boolean;
}