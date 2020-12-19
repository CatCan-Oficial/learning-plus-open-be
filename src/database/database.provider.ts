import * as mongoose from 'mongoose';

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				'database_connection_string',
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				}
			),
	},
];