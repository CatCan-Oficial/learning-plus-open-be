import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topic extends Document {

	@Prop({
		required: true,
		unique: true
	})
	name: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);