
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Auth, AuthSchema } from 'src/auth/schemas/Auth';
import { UserRole } from '../enums/UserRole';

@Schema()
export class User extends Document {

	@Prop()
	name: string;

	@Prop()
	lastName: string;

	@Prop({ enum: Object.values(UserRole) })
	role: number

	@Prop({ type: AuthSchema })
	auth: Auth;
}

export const UserSchema = SchemaFactory.createForClass(User);