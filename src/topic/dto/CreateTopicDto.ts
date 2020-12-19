import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {

	@ApiProperty()
	name: string;
}