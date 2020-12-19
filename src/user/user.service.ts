import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/schemas/User';
import { Model } from 'mongoose';
import { Auth } from 'src/auth/schemas/Auth';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import BaseService from 'src/core/services/base.service';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto>{

	constructor(
		@Inject('USER_MODEL')
		model: Model<User>
	) {
		super('Usuário', model);
	}

	async findByAuth(auth: Auth) {
		const document = await this.model.findOne({
			'auth.username': auth.username,
			'auth.password': auth.password
		})

		if (document) {
			return document;
		} else {
			throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
		}
	}

	async findByRole(role: number) {
		return await this.model.find({ role });
	}
}
