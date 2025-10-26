import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  firstname?: string;

  @Prop({ required: false })
  lastname?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ required: false })
  photo?: string;

  @Prop({ required: false })
  phone?: string;

  // CV Builder specific fields
  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: false })
  postalCode?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  title?: string; // Professional title

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ type: [Object], required: false })
  socialMedia?: Array<{
    platform: string;
    link: string;
  }>;

  @Prop({ required: false })
  googleId?: string; // For Google OAuth

  @Prop({ default: false })
  isVerified: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
