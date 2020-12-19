import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/CreateRoomDto';
import { UpdateRoomDto } from './dto/UpdateRoomDto';
import { RoomService } from './room.service';

@ApiTags('RoomController')
@Controller('room')
export class RoomController {

	constructor(
		private readonly service: RoomService
	) { }

	@ApiOperation({
		summary: 'Cria a sala onde serão aplicadas atividades'
	})
	@Post()
	async create(@Body() createDto: CreateRoomDto) {
		return await this.service.create(createDto);
	}

	@ApiOperation({
		summary: 'Lista salas'
	})
	@Get()
	async find() {
		return await this.service.list();
	}

	@ApiOperation({
		summary: 'Encontra sala por ID'
	})
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id);
	}

	@ApiOperation({
		summary: 'Atualiza sala por ID'
	})
	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateRoomDto
	) {
		return await this.service.update(id, dto);
	}

	@ApiOperation({
		summary: 'Deleta sala por ID'
	})
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}

	@ApiOperation({
		summary: 'Adiciona estudante à sala pelo ID dele'
	})
	@Put(':id/student/:studentId')
	async addStudent(
		@Param('id') id: string,
		@Param('studentId') studentId: string
	) {
		return await this.service.addStudent(id, studentId);
	}

	@ApiOperation({
		summary: 'Remove estudante da sala pelo ID dele'
	})
	@Delete(':id/student/:studentId')
	async removeStudent(
		@Param('id') id: string,
		@Param('studentId') studentId: string
	) {
		return await this.service.removeStudent(id, studentId);
	}
}

