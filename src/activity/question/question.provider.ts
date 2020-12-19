import { Connection } from 'mongoose';
import { QuestionSchema } from './schemas/Question';

export const questionsProviders = [
	{
		provide: 'QUESTION_MODEL',
		useFactory: (connection: Connection) => connection.model('Question', QuestionSchema),
		inject: ['DATABASE_CONNECTION']
	},
];