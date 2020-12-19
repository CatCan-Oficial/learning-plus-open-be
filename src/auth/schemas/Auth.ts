import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {

	@Prop()
	username: string;

	@Prop()
	password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);