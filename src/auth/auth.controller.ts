import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from './dto/AuthDto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {

	constructor(private readonly service: AuthService) { }

	@ApiOperation({
		summary: 'Login do usuário'
	})
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const jwt = await this.service.signIn(dto);
		return jwt;
	}
}
