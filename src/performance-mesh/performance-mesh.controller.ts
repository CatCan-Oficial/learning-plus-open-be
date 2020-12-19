import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryBy } from './enum/QueryBy';
import { PerformanceMeshService } from './performance-mesh.service';

@ApiTags('PerformanceMeshController')
@Controller('performance-mesh')
export class PerformanceMeshController {

	constructor(
		protected readonly service: PerformanceMeshService
	) { }

	@ApiQuery({
		name: 'by',
		required: false,
		type: String,
		enum: QueryBy
	})
	@ApiQuery({
		name: 'id',
		required: false,
		type: String
	})
	@ApiOperation({ summary: 'Lista performance por query' })
	@Get()
	async query(
		@Query('by') queryBy: QueryBy,
		@Query('id') queryId: string
	) {
		return await this.service.query(queryBy, queryId, null);
	}

	@ApiQuery({
		name: 'by',
		required: false,
		type: String,
		enum: QueryBy
	})
	@ApiQuery({
		name: 'id',
		required: false,
		type: String
	})
	@ApiOperation({ summary: 'Lista performance por query e ID do estudante' })
	@Get('student/:studentId')
	async queryByStudentId(
		@Query('by') queryBy: QueryBy,
		@Query('id') queryId: string,
		@Param('studentId') studentId: string
	) {
		return await this.service.query(queryBy, queryId, studentId);
	}

	@ApiQuery({
		name: 'by',
		required: false,
		type: String,
		enum: QueryBy
	})
	@ApiQuery({
		name: 'id',
		required: false,
		type: String
	})
	@ApiOperation({ summary: 'Lista performance por query' })
	@Get('sum')
	async querySum(
		@Query('by') queryBy: QueryBy,
		@Query('id') queryId: string
	) {
		return await this.service.querySum(queryBy, queryId, null);
	}

	@ApiQuery({
		name: 'by',
		required: false,
		type: String,
		enum: QueryBy
	})
	@ApiQuery({
		name: 'id',
		required: false,
		type: String
	})
	@ApiOperation({ summary: 'Lista performance por query e ID do estudante' })
	@Get('sum/student/:studentId')
	async querySumByStudentId(
		@Query('by') queryBy: QueryBy,
		@Query('id') queryId: string,
		@Param('studentId') studentId: string
	) {
		return await this.service.querySum(queryBy, queryId, studentId);
	}
}
