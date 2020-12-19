import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { authsProviders } from './auth.provider';

@Module({
	imports: [
		DatabaseModule,
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60s' },
		})
	],
	providers: [AuthService, JwtStrategy, ...authsProviders],
	exports: [AuthService],
	controllers: [AuthController]
})
export class AuthModule { }
