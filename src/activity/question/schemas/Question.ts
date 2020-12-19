import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Activity } from 'src/activity/schemas/Activity';
import { AnswerModel } from '../helper-models/AnswerModel';
import { TopicModel } from '../helper-models/TopicModel';

@Schema()
export class Question extends Document {

	@Prop()
	title: string;

	@Prop()
	statement: string | any;

	@Prop()
	type: number;

	@Prop({ type: SchemaTypes.Array })
	answers: AnswerModel[];

	@Prop()
	correctAnswer: number;

	@Prop({ type: SchemaTypes.Array })
	topics: TopicModel[];

	@Prop()
	activityId: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);