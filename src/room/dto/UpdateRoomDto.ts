import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto {
	@ApiProperty()
	name: string;
	
	@ApiProperty()
	subjectId: string;
}