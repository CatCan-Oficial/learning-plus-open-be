import { Connection } from 'mongoose';
import { TopicSchema } from './schemas/Topic';

export const topicsProviders = [
	{
		provide: 'TOPIC_MODEL',
		useFactory: (connection: Connection) => connection.model('Topic', TopicSchema),
		inject: ['DATABASE_CONNECTION']
	},
];