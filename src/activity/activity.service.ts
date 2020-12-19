import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseService from 'src/core/services/base.service';
import { PerformanceMeshService } from 'src/performance-mesh/performance-mesh.service';
import { RoomService } from 'src/room/room.service';
import { TopicService } from 'src/topic/topic.service';
import { UserRole } from 'src/user/enums/UserRole';
import { UserService } from 'src/user/user.service';
import { hasDuplicates } from 'src/utils/helpers';
import { CreateActivityDto } from './dto/CreateActivityDto';
import { UpdateActivityDto } from './dto/UpdateActivityDto';
import { AnsweredQuestion } from './question/answered-question/AnsweredQuestion';
import { AnswerDto } from './question/answered-question/dto/AnswerDto';
import { EvaluateDto } from './question/answered-question/dto/EvaluateDto';
import { CreateQuestionDto } from './question/dto/CreateQuestionDto';
import { TopicModel } from './question/helper-models/TopicModel';
import { QuestionService } from './question/question.service';
import { Question } from './question/schemas/Question';
import { Activity } from './schemas/Activity';

@Injectable()
export class ActivityService extends BaseService<Activity, CreateActivityDto, UpdateActivityDto>{
	constructor(
		@Inject('ACTIVITY_MODEL')
		model: Model<Activity>,
		private readonly questionService: QuestionService,
		private readonly roomService: RoomService,
		private readonly topicService: TopicService,
		private readonly userService: UserService,
		@Inject(forwardRef(() => PerformanceMeshService))
		private readonly performanceMeshService: PerformanceMeshService
	) { super('Atividade', model) }

	async create(dto: CreateActivityDto) {
		const roomDocument = await this.roomService.findById(dto.roomId);
		const document = await this.model.create(<Activity>dto);

		if (roomDocument.activities)
			roomDocument.activities.push(document);
		else
			roomDocument.activities = [document];

		await roomDocument.save();

		return document;
	}

	async deleteById(id: string) {
		const document = await this.findById(id);
		const roomDocument = await this.roomService.findById(document.roomId);

		await this.model.deleteOne({ _id: document.id });
		roomDocument.activities = roomDocument.activities.filter(a => a.id != id);
	}

	async addStudent(id: string, studentId: string) {
		const document = await this.findById(id);
		const studentDocument = await this.userService.findById(studentId);

		if (studentDocument.role === UserRole.Student && !document.studentsIds.includes(studentId)) {
			document.studentsIds.push(studentDocument.id);
			await document.save();

			return `Estudante ${studentDocument.name} adicionado com sucesso à atividade ${document.title}`;
		} else {
			throw new HttpException('Não foi possível adicionar o usuário à esta atividade', HttpStatus.BAD_REQUEST);
		}
	}

	async removeStudent(id: string, studentId: string) {
		const document = await this.findById(id);
		const studentDocument = await this.userService.findById(studentId);

		if (document.studentsIds.includes(studentId)) {
			document.studentsIds.splice(document.studentsIds.indexOf(studentId), 1);

			await document.save();

			return `Estudante ${studentDocument.name} removido com sucesso da atividade ${document.title}`;
		} else {
			throw new HttpException('Não foi possível remover o usuário desta atividade', HttpStatus.BAD_REQUEST);
		}
	}

	async createQuestion(id: string, questionDto: CreateQuestionDto) {
		const document = await this.findById(id);
		const roomDocument = await this.roomService.findById(document.roomId);

		if (hasDuplicates(questionDto.answers.map(a => a.value)))
			throw new HttpException('Não foi possível adicionar a questão, respostas com valores duplicados', HttpStatus.BAD_REQUEST);

		const questionDocumentToCreate: Question = <any>questionDto;
		const topics = await Promise.all(questionDto.topics.map(t => this.topicService.findById(t.id)));

		questionDocumentToCreate.topics.map(t => {
			const foundTopic = topics.find(topic => topic._id.equals(t.id));
			t.name = foundTopic.name;
		});

		questionDto.topics.map(topicModel => {
			if (!topicModel.weight || topicModel.weight < 0)
				throw new HttpException(`Peso inválido para o tópico ${topics.find(t => t._id.equals(topicModel.id)).name}`, HttpStatus.BAD_REQUEST)
		})

		questionDocumentToCreate.activityId = document.id;

		const questionDocument = await this.questionService.create(questionDto);

		if (document.questions)
			document.questions.push(questionDocument);
		else
			document.questions = [questionDocument];

		await document.save();

		roomDocument.activities.map(a => {
			if (document._id.equals(a._id)) {
				a.questions = document.questions;
			}
		});

		await this.roomService.update(roomDocument._id, <any>roomDocument)

		return questionDocument;
	}

	async deleteQuestion(questionId: string) {
		const questionDocument = await this.questionService.findById(questionId);
		const document = await this.findById(questionDocument.activityId);
		const roomDocument = await this.roomService.findById(document.roomId);
		const questions = document.questions.filter(q => q._id != questionId);

		document.questions = questions;
		await this.questionService.deleteById(questionId);
		await document.save();

		roomDocument.activities.map(a => {
			if (document._id.equals(a._id)) {
				a.questions = document.questions;
			}
		});

		await this.roomService.update(roomDocument._id, <any>roomDocument);
	}

	async answer(id: string, sentAnswers: AnswerDto[]) {
		const document = await this.findById(id);

		if (document.answeredQuestions && document.answeredQuestions.length > 0)
			document.answeredQuestions.map(answeredQuestion => {
				const alreadyAnsweredQuestion = !!sentAnswers.find(sentAnswer =>
					answeredQuestion.studentId == sentAnswer.studentId &&
					answeredQuestion.questionId == sentAnswer.questionId
				);

				if (alreadyAnsweredQuestion)
					throw new HttpException('Não foi possível responder a atividade, resposta já enviada', HttpStatus.INTERNAL_SERVER_ERROR);
			});

		const answers = sentAnswers.map(sentAnswer => {
			const answeredQuestion = new AnsweredQuestion();
			let topics: TopicModel[] = null;

			document.questions
				.map(q => {
					if (q._id == sentAnswer.questionId)
						topics = q.topics
				});

			answeredQuestion.studentId = sentAnswer.studentId;
			answeredQuestion.questionId = sentAnswer.questionId;
			answeredQuestion.answer = sentAnswer.answer;
			answeredQuestion.topics = topics;

			return answeredQuestion;
		});

		if (answers.length > document.questions.length)
			throw new HttpException(`Quantidade de respostas maior do que o esperado de ${document.questions.length}`, HttpStatus.INTERNAL_SERVER_ERROR);

		else if (answers.length < document.questions.length)
			throw new HttpException('Atividade incompleta', HttpStatus.BAD_REQUEST);

		if (document.answeredQuestions && document.answeredQuestions.length > 0)
			document.answeredQuestions.push(...answers);
		else
			document.answeredQuestions = [...answers];

		await this.model.updateOne({ _id: document.id }, document);
		return document;
	}

	async evaluateActivity(id: string, studentId: string, evaluations: EvaluateDto[]) {
		const document = await this.findById(id);
		const studentDocument = await this.userService.findById(studentId);

		if (studentDocument.role != UserRole.Student)
			throw new HttpException('Usuário inválido para está ação', HttpStatus.BAD_REQUEST);

		if (document.answeredQuestions) {
			const studentAnswers = document.answeredQuestions
				.filter(answeredQuestion => answeredQuestion.studentId === studentId);

			if (studentAnswers.length === 0)
				throw new HttpException('Este estudante ainda não respondeu a atividade', HttpStatus.BAD_REQUEST);
		}

		document.answeredQuestions.map(answeredQuestion => {

			const evaluation = evaluations.find(evaluation => evaluation.questionId == answeredQuestion.questionId);
			answeredQuestion.answeredCorrectly = evaluation.answeredCorrectly;
		});

		await document.save();
		await this.performanceMeshService.generatePerformance(studentDocument.id, document);

		return 'Atividade avaliada com sucesso';
	}
}
