import { Connection } from 'mongoose';
import { AuthSchema } from './schemas/Auth';

export const authsProviders = [
	{
		provide: 'AUTH_MODEL',
		useFactory: (connection: Connection) => connection.model('Auth', AuthSchema),
		inject: ['DATABASE_CONNECTION']
	},
];