import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/User';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/AuthDto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) { }

	private async createToken(user: User) {
		const payload = user as any;
		return {
			access_token: this.jwtService.sign(payload.toJSON()),
			token_type: 'bearer'
		};
	}

	async signIn(dto: AuthDto) {
		const user = await this.userService.findByAuth(dto as any);

		if (user) {
			return await this.createToken(user);
		} else {
			throw new HttpException('Username ou senha incorretos', HttpStatus.BAD_REQUEST);
		}
	}
}
