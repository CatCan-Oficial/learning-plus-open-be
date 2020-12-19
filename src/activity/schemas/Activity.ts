import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/User';
import { AnsweredQuestion } from '../question/answered-question/AnsweredQuestion';
import { Question } from '../question/schemas/Question';


@Schema()
export class Activity extends Document {

	@Prop({
		required: true,
		unique: true
	})
	title: string;

	@Prop()
	description: string | any;

	@Prop()
	questions: Question[];

	@Prop()
	studentsIds: string[];

	@Prop()
	roomId: string;

	@Prop()
	answeredQuestions: AnsweredQuestion[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);