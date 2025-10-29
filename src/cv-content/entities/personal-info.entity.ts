import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonalInfoDocument = PersonalInfo & Document;

@Schema({ timestamps: true })
export class PersonalInfo {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  otherName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  profilePhoto?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  state?: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: false })
  zipCode?: string;

  @Prop({ type: Date, required: false })
  dateOfBirth?: Date;

  @Prop({ required: false })
  nationality?: string;

  @Prop({ type: Object, required: false })
  socialMedia?: Record<string, string>;

  createdAt: Date;

  updatedAt: Date;
}

export const PersonalInfoSchema = SchemaFactory.createForClass(PersonalInfo);

