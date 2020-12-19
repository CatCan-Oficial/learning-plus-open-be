import { Connection } from 'mongoose';
import { SubjectSchema } from './schemas/Subject';

export const subjectsProviders = [
	{
		provide: 'SUBJECT_MODEL',
		useFactory: (connection: Connection) => connection.model('Subject', SubjectSchema),
		inject: ['DATABASE_CONNECTION']
	},
];