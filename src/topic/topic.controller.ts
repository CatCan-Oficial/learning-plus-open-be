import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/CreateTopicDto';
import { UpdateTopicDto } from './dto/UpdateTopicDto';
import { TopicService } from './topic.service';

@ApiTags('TopicController')
@Controller('topic')
export class TopicController {

	constructor(
		private readonly service: TopicService
	) { }

	@ApiOperation({
		summary: 'Cria o tópico para avaliação das questões'
	})
	@Post()
	async create(@Body() createDto: CreateTopicDto) {
		return await this.service.create(createDto);
	}

	@ApiOperation({
		summary: 'Lista tópicos'
	})
	@Get()
	async find() {
		return await this.service.list();
	}

	@ApiOperation({
		summary: 'Encontra tópico por ID'
	})
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id);
	}

	@ApiOperation({
		summary: 'Atualiza tópico por ID'
	})
	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateTopicDto
	) {
		return await this.service.update(id, dto);
	}

	@ApiOperation({
		summary: 'Deleta tópico por ID'
	})
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}
}