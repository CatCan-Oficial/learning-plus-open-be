import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from 'src/auth/dto/AuthDto';
import { UserRole } from '../enums/UserRole';

export class CreateUserDto {

	@ApiProperty()
	name: string;

	@ApiProperty()
	lastName: string;

	@ApiProperty({ enum: Object.values(UserRole) })
	role: number;

	@ApiProperty()
	auth: AuthDto;
}