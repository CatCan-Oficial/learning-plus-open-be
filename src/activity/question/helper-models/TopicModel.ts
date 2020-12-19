import { ApiProduces, ApiProperty } from '@nestjs/swagger';

export class TopicModel {

	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	weight: number;
}