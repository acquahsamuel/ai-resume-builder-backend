import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EducationDocument = Education & Document;

@Schema({ timestamps: true })
export class Education {
  @Prop({ required: true, index: true })
  userId: number;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  @Prop({ required: false })
  institutionWebsite?: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ required: false })
  gpa?: string;

  @Prop({ type: [String], required: false })
  coursework?: string[];

  @Prop({ type: [String], required: false })
  extracurricularActivities?: string[];

  @Prop({ type: [String], required: false })
  honorsAndAwards?: string[];

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ default: 0 })
  sortOrder: number;

  createdAt: Date;

  updatedAt: Date;
}

export const EducationSchema = SchemaFactory.createForClass(Education);