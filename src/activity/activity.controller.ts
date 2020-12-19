import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/CreateActivityDto';
import { UpdateActivityDto } from './dto/UpdateActivityDto';
import { AnswerDto } from './question/answered-question/dto/AnswerDto';
import { EvaluateDto } from './question/answered-question/dto/EvaluateDto';
import { CreateQuestionDto } from './question/dto/CreateQuestionDto';
import { UpdateQuestionDto } from './question/dto/UpdateQuestionDto';
import { QuestionService } from './question/question.service';

@ApiTags('ActivityController')
@Controller('activity')
export class ActivityController {

	constructor(
		private readonly service: ActivityService,
		private readonly questionService: QuestionService
	) { }

	@ApiOperation({
		summary: 'Cria uma atividade para a sala informada'
	})
	@Post()
	async create(@Body() createDto: CreateActivityDto) {
		return await this.service.create(createDto);
	}

	@ApiOperation({
		summary: 'Lista atividades'
	})
	@Get()
	async list() {
		return await this.service.list();
	}

	@ApiOperation({
		summary: 'Encontra atividade por ID'
	})
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.service.findById(id);
	}

	@ApiOperation({
		summary: 'Atualiza atividade por ID'
	})
	@Put(':id')
	async updateById(
		@Param('id') id: string,
		@Body() dto: UpdateActivityDto
	) {
		return await this.service.update(id, dto);
	}

	@ApiOperation({
		summary: 'Deleta atividade por ID'
	})
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		return await this.service.deleteById(id);
	}

	@ApiOperation({
		summary: 'Cria questão para atividade'
	})
	@Post(':id/question')
	async addQuestion(
		@Param('id') id: string,
		@Body() questionDto: CreateQuestionDto
	) {
		return await this.service.createQuestion(id, questionDto);
	}

	@ApiOperation({
		summary: 'Lista questões por ID da atividade'
	})
	@Get(':id/question')
	async listQuestionsById(@Param('id') id: string) {
		return (await this.service.findById(id)).questions;
	}

	@ApiOperation({
		summary: 'Lista questões da atividade'
	})
	@Get('question/list')
	async listAllQuestions() {
		return await this.questionService.list();
	}

	@ApiOperation({
		summary: 'Altera questão por ID'
	})
	@Put('question/:questionId')
	async updateQuestion(
		@Param('questionId') questionId: string,
		@Body() questionDto: UpdateQuestionDto
	) {
		return await this.questionService.update(questionId, questionDto);
	}

	@ApiOperation({
		summary: 'Deleta questão por ID'
	})
	@Delete('question/:questionId')
	async removeQuestion(@Param('questionId') questionId: string) {
		return await this.service.deleteQuestion(questionId);
	}

	@ApiOperation({
		summary: 'Responde atividade por ID'
	})
	@Post(':id/answer')
	@ApiBody({ type: [AnswerDto] })
	async answer(
		@Param('id') id: string,
		@Body() answers: AnswerDto[]
	) {
		return await this.service.answer(id, answers);
	}

	@ApiOperation({
		summary: 'Insere aluno na atividade por ID'
	})
	@Put(':id/student/:studentId')
	async addStudent(@Param('id') id: string, @Param('studentId') studentId: string) {
		return await this.service.addStudent(id, studentId);
	}

	@ApiOperation({
		summary: 'Deleta aluno na atividade por ID'
	})
	@Delete(':id/student/:studentId')
	async removeStudent(
		@Param('id') id: string,
		@Param('studentId') studentId: string
	) {
		return await this.service.removeStudent(id, studentId);
	}

	@ApiOperation({
		summary: 'Avalia atividade do aluno por ID'
	})
	@Post(':id/student/:studentId/evaluate')
	@ApiBody({ type: [EvaluateDto] })
	async evaluateActivity(
		@Param('id') id: string,
		@Param('studentId') studentId: string,
		@Body() evaluations: EvaluateDto[]
	) {
		return await this.service.evaluateActivity(id, studentId, evaluations);
	}
}
