import { Connection } from 'mongoose';
import { RoomSchema } from './schemas/Room';

export const roomsProviders = [
	{
		provide: 'ROOM_MODEL',
		useFactory: (connection: Connection) => connection.model('Room', RoomSchema),
		inject: ['DATABASE_CONNECTION']
	},
];