import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserService } from './user.service';

@ApiTags('UserController')
@Controller('user')
export class UserController {

	constructor(
		private readonly service: UserService
	) { }


	@ApiOperation({
		summary: 'Cria o usuário e os dados de acesso'
	})
	@Post()
	async create(@Body() createDto: CreateUserDto) {
		return await this.service.create(createDto);
	}

	@ApiOperation({
		summary: 'Lista usuários'
	})
	@Get()
	async list() {
		const documents = await this.service.list();
		return documents.map(d => {
			d.auth = undefined;
			return d;
		});
	}

	@ApiOperation({
		summary: 'Lista usuários por tipo'
	})
	@Get('role/:role')
	async findByRole(@Param('role') role: number) {
		const documents = await this.service.findByRole(role);
		return documents.map(d => {
			d.auth = undefined;
			return d;
		});
	}

	@ApiOperation({
		summary: 'Encontra usuário por ID'
	})
	@Get(':id')
	async findById(@Param('id') id: string) {
		const document = await this.service.findById(id);
		document.auth = undefined;
		return document;
	}

	@ApiOperation({
		summary: 'Atualiza usuário por ID'
	})
	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateUserDto
	) {
		return await this.service.update(id, dto);
	}

	@ApiOperation({
		summary: 'Deleta usuário por ID'
	})
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}
}
