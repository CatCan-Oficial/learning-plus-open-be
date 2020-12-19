import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';

@Module({
	imports: [
		DatabaseModule
	],
	providers: [UserService, ...userProviders],
	exports: [UserService],
	controllers: [UserController]
})
export class UserModule { }
