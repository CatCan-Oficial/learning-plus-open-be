import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {

	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	roomId: string;
}