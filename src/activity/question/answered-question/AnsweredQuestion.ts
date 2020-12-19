import { AnswerModel } from '../helper-models/AnswerModel';
import { TopicModel } from '../helper-models/TopicModel';

export class AnsweredQuestion {
	studentId: string;
	questionId: string;
	answeredCorrectly: boolean;
	answer: AnswerModel;
	topics: TopicModel[];
}