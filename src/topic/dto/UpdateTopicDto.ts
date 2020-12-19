import { ApiProperty } from '@nestjs/swagger';

export class UpdateTopicDto {

	@ApiProperty()
	name: string;
}