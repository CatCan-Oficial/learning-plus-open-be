import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/CreateSubjectDto';
import { UpdateSubjectDto } from './dto/UpdateSubjectDto';
import { SubjectService } from './subject.service';

@ApiTags('SubjectController')
@Controller('subject')
export class SubjectController {

	constructor(
		private readonly service: SubjectService
	) { }

	@ApiOperation({
		summary: 'Cria a matéria utilizada para definição de salas'
	})
	@Post()
	async create(@Body() createDto: CreateSubjectDto) {
		return await this.service.create(createDto);
	}

	@ApiOperation({
		summary: 'Lista matérias'
	})
	@Get()
	async find() {
		return await this.service.list();
	}

	@ApiOperation({
		summary: 'Encontra matéria por ID'
	})
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id);
	}

	@ApiOperation({
		summary: 'Atualiza matéria por ID'
	})
	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateSubjectDto
	) {
		return await this.service.update(id, dto);
	}

	@ApiOperation({
		summary: 'Deleta matéria por ID'
	})
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}
}
