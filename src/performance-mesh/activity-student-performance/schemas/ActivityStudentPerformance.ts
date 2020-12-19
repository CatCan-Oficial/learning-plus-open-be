import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';

@Schema()
export class ActivityStudentPerformance extends Document {

	@Prop({ required: true })
	studentId: string;

	@Prop({ required: true })
	activityId: string;

	@Prop({ required: true })
	totalMissedAnswers: number;

	@Prop({ required: true })
	totalCorrectAnswers: number;

	@Prop()
	totalPointsByTopicMap: Map<string, number>;

	@Prop()
	performancePointsByTopicMap: Map<string, number>;

	@Prop()
	performancePercentage: number;

	@Prop()
	performancePercentageByTopicMap: Map<string, number>;

	@Prop({ type: SchemaTypes.Date })
	created: Date;
}

export const ActivityStudentPerformanceSchema = SchemaFactory.createForClass(ActivityStudentPerformance);
