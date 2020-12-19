import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import BaseService from '../services/base.service';

export default abstract class BaseController<CreateDTO, UpdateDTO> {

	constructor(
		protected readonly service: BaseService<any, CreateDTO, UpdateDTO>
	) { }

	@Post()
	async create(@Body() createDto: CreateDTO) {
		return await this.service.create(createDto);
	}

	@Get()
	async find() {
		return await this.service.list();
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id);
	}

	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateDTO
	) {
		return await this.service.update(id, dto);
	}

	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}
}
