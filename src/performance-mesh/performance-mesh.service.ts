import { flatten, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { ActivityService } from 'src/activity/activity.service';
import { AnsweredQuestion } from 'src/activity/question/answered-question/AnsweredQuestion';
import { Question } from 'src/activity/question/schemas/Question';
import { Activity } from 'src/activity/schemas/Activity';
import BaseService from 'src/core/services/base.service';
import { RoomService } from 'src/room/room.service';
import { fromMap, percentage, sumMapValues, XOR } from 'src/utils/helpers';
import { ActivityStudentPerformance } from './activity-student-performance/schemas/ActivityStudentPerformance';
import { QueryBy } from './enum/QueryBy';
import { PerformanceSumModel } from './helper-models/PerformanceSumModel';

@Injectable()
export class PerformanceMeshService extends BaseService<ActivityStudentPerformance, Object, Object> {

	constructor(
		@Inject('ACTIVITY_STUDENT_PERFORMANCE_MODEL')
		protected readonly activityStudentPerfModel: Model<ActivityStudentPerformance>,
		@Inject(forwardRef(() => ActivityService))
		private readonly activityService: ActivityService,
		private readonly roomService: RoomService
	) { super('Performance', activityStudentPerfModel) }

	async findByActivityIdAndStudentId(activityId: string, studentId: string) {
		const document = await this.activityStudentPerfModel.findOne({
			activityId,
			studentId
		});

		return document;
	}

	async find(partialDocument: Partial<ActivityStudentPerformance>) {
		const documents = await this.activityStudentPerfModel.find(partialDocument);
		return documents;
	}

	async query(queryBy: QueryBy, queryId: string, studentId: string) {
		if (XOR(queryBy, queryId))
			throw new HttpException('Má formação da query de pesquisa', HttpStatus.BAD_REQUEST);

		if (!studentId && !queryBy && !queryId)
			return await this.list();

		if (studentId && !queryBy && !queryId)
			return await this.find({ studentId });
		else
			return await this.findByQueryAndStudentId(queryBy, queryId, studentId);

	}

	async querySum(queryBy: QueryBy, queryId: string, studentId: string) {
		const documents = await this.query(queryBy, queryId, studentId);
		let documentsSum: PerformanceSumModel = null;

		if (documents && documents.length > 0)
			documentsSum = plainToClass(PerformanceSumModel, documents.reduce(this.reduceDocuments).toObject());

		documentsSum.isInstitutionAverage = (!queryBy && !queryId && !studentId);
		documentsSum.activityId = queryBy == QueryBy.Activity ? queryId : null;
		documentsSum.roomId = queryBy == QueryBy.Room ? queryId : null;
		documentsSum.subjectId = queryBy == QueryBy.Subject ? queryId : null;
		documentsSum.studentId = studentId || null;
		documentsSum.totalPointsByTopicMap = fromMap(documentsSum.totalPointsByTopicMap);
		documentsSum.performancePointsByTopicMap = fromMap(documentsSum.performancePointsByTopicMap);
		documentsSum.performancePercentageByTopicMap = fromMap(documentsSum.performancePercentageByTopicMap);

		return documentsSum;
	}

	async generatePerformance(studentId: string, activityDocument: Activity) {
		const document = await this.findByActivityIdAndStudentId(activityDocument.id, studentId);

		if (document)
			throw new HttpException('Performance já gerada para o estudante', HttpStatus.BAD_REQUEST);

		const totalCorrectAnswers = activityDocument.answeredQuestions.filter(aq => aq.answeredCorrectly).length;
		const totalMissedAnswers = activityDocument.questions.length - totalCorrectAnswers;
		const topicMaps = this.getTopicMaps(activityDocument.answeredQuestions, activityDocument.questions);
		const totalAnswers = totalCorrectAnswers + totalMissedAnswers;
		const performancePercentage = percentage(totalCorrectAnswers, totalAnswers);


		await this.activityStudentPerfModel.create({
			studentId,
			activityId: activityDocument.id,
			totalCorrectAnswers,
			totalMissedAnswers,
			totalPointsByTopicMap: topicMaps.totalPointsByTopicMap,
			performancePointsByTopicMap: topicMaps.performancePointsByTopicMap,
			performancePercentage,
			performancePercentageByTopicMap: this.getPerformancePercentageByTopicMap(
				topicMaps.totalPointsByTopicMap,
				topicMaps.performancePointsByTopicMap
			),
			created: new Date()
		});

		return 'Performance gerada com sucesso';
	}

	private getTopicMaps(answeredQuestions: AnsweredQuestion[], questions: Question[]) {
		const totalPointsByTopicMap = new Map<string, number>();

		questions.map(q =>
			q.topics.map(topic => {
				const totalPoints = totalPointsByTopicMap.get(topic.id) || 0;
				totalPointsByTopicMap.set(topic.id, totalPoints + topic.weight);
			})
		);

		const performancePointsByTopicMap = new Map<string, number>();

		answeredQuestions.map(aq => {
			if (aq.answeredCorrectly)
				aq.topics.map(t => {
					const totalPoints = performancePointsByTopicMap.get(t.id) || 0;
					performancePointsByTopicMap.set(t.id, totalPoints + t.weight);
				});
		});

		return {
			totalPointsByTopicMap,
			performancePointsByTopicMap
		};
	}

	private getPerformancePercentageByTopicMap(
		totalPointsByTopicMap: Map<string, number>,
		performancePointsByTopicMap: Map<string, number>
	) {
		const perfPercMap = new Map<string, number>();

		totalPointsByTopicMap.forEach((points, topicId) => {
			const pointsMade = performancePointsByTopicMap.get(topicId) || 0;
			const perfPerc = percentage(pointsMade, points);

			perfPercMap.set(topicId, perfPerc)
		});

		return perfPercMap;
	}

	private async findByQueryAndStudentId(queryBy: QueryBy, queryId: string, studentId: string) {
		if (queryBy && queryId) {
			let performancesDocumentsMatrix: ActivityStudentPerformance[][];

			switch (queryBy) {
				case QueryBy.Subject:
					const roomsDocuments = await this.roomService.findBySubjectId(queryId);
					const activities = flatten(roomsDocuments.map(rd => rd.activities));

					performancesDocumentsMatrix = await Promise.all(
						activities.map(a => {
							const options = <any>{
								activityId: a._id
							};

							if (studentId)
								options.studentId = studentId;

							return this.find(options);
						})
					);
					break;
				case QueryBy.Room:
					const roomDocument = await this.roomService.findById(queryId);

					performancesDocumentsMatrix = await Promise.all(
						roomDocument.activities.map(a => {
							const options = <any>{
								activityId: a._id
							};

							if (studentId)
								options.studentId = studentId;

							return this.find(options);
						})
					);
					break;
				case QueryBy.Activity:
					const options = <any>{
						activityId: queryId
					};

					if (studentId)
						options.studentId = studentId;

					performancesDocumentsMatrix = [(await this.find(options))];
					break;
			}

			return flatten(performancesDocumentsMatrix);
		}
	}

	private reduceDocuments(previous: ActivityStudentPerformance, current: ActivityStudentPerformance) {
		if (!previous)
			return current;

		current.totalPointsByTopicMap = sumMapValues(previous.totalPointsByTopicMap, current.totalPointsByTopicMap);
		current.performancePointsByTopicMap = sumMapValues(previous.performancePointsByTopicMap, current.performancePointsByTopicMap);
		current.performancePercentageByTopicMap = sumMapValues(previous.performancePercentageByTopicMap, current.performancePercentageByTopicMap, true);
		current.totalCorrectAnswers = previous.totalCorrectAnswers + current.totalCorrectAnswers;
		current.totalMissedAnswers = previous.totalMissedAnswers + current.totalMissedAnswers;
		current.performancePercentage = (previous.performancePercentage + current.performancePercentage) / 2;

		return current;
	}
}
