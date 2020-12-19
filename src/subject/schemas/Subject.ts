import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Subject extends Document {

	@Prop({
		required: true,
		unique: true
	})
	@ApiProperty()
	name: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);