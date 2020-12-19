import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {

	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;
}