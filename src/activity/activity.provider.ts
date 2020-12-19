import { Connection } from 'mongoose';
import { ActivitySchema } from './schemas/Activity';

export const activitiesProviders = [
	{
		provide: 'ACTIVITY_MODEL',
		useFactory: (connection: Connection) => connection.model('Activity', ActivitySchema),
		inject: ['DATABASE_CONNECTION']
	},
];