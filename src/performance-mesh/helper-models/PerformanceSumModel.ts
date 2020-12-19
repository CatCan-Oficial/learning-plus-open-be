import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class PerformanceSumModel {

	@ApiProperty()
	isInstitutionAverage: boolean;

	@ApiProperty()
	studentId: string;

	@ApiProperty()
	activityId: string;

	@ApiProperty()
	roomId: string;

	@ApiProperty()
	subjectId: string;

	@ApiProperty()
	totalMissedAnswers: number;

	@ApiProperty()
	totalCorrectAnswers: number;

	@ApiProperty()
	@Type(() => Number)
	totalPointsByTopicMap: Map<string, number>;

	@ApiProperty()
	performancePointsByTopicMap: Map<string, number>;

	@ApiProperty()
	performancePercentage: number;

	@ApiProperty()
	performancePercentageByTopicMap: Map<string, number>;

	@Exclude()
	_id: string;

	@Exclude()
	__v: string;
}