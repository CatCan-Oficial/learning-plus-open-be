import { Connection } from 'mongoose';
import { ActivityStudentPerformanceSchema } from './schemas/ActivityStudentPerformance';

export const activityStudentPerformancesProviders = [
	{
		provide: 'ACTIVITY_STUDENT_PERFORMANCE_MODEL',
		useFactory: (connection: Connection) => connection.model('ActivityStudentPerformance', ActivityStudentPerformanceSchema),
		inject: ['DATABASE_CONNECTION']
	},
];