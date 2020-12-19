import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';
import { Activity } from 'src/activity/schemas/Activity';
import { User } from 'src/user/schemas/User';
import { Subject } from '../../subject/schemas/Subject';

@Schema()
export class Room extends Document {

	@Prop({
		required: true,
		unique: true
	})
	name: string;

	@Prop()
	activities: Activity[];

	@Prop()
	studentsIds: string[];

	@Prop()
	subject: Subject;

	@Prop({
		required: true,
		type: SchemaTypes.ObjectId,
		ref: 'USER_MODEL'
	})
	teacherId: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);