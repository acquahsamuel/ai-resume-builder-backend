import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GPAScale {
  SCALE_4 = '4.0',
  SCALE_5 = '5.0',
  SCALE_100 = '100'
}

export type EducationDocument = Education & Document;

@Schema({ timestamps: true })
export class Education {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: false })
  isOngoing: boolean;

  @Prop({ required: false })
  gpa?: number;

  @Prop({
    type: String,
    enum: GPAScale,
    default: GPAScale.SCALE_4
  })
  gpaScale: GPAScale;

  @Prop({ type: [String], required: false })
  honors?: string[];

  @Prop({ type: [String], required: false })
  relevantCoursework?: string[];

  @Prop({ required: false })
  activities?: string;

  @Prop({ required: false })
  thesis?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const EducationSchema = SchemaFactory.createForClass(Education);