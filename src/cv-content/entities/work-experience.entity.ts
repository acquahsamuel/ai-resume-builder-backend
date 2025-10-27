import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EmploymentType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship'
}

export type WorkExperienceDocument = WorkExperience & Document;

@Schema({ timestamps: true })
export class WorkExperience {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: false })
  location?: string;

  @Prop({
    type: String,
    enum: EmploymentType,
    default: EmploymentType.FULL_TIME
  })
  employmentType: EmploymentType;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: false })
  isCurrent: boolean;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [String], required: false })
  achievements?: string[];

  @Prop({ type: [String], required: false })
  responsibilities?: string[];

  @Prop({ type: [String], required: false })
  technologies?: string[];

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  aiGenerated: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const WorkExperienceSchema = SchemaFactory.createForClass(WorkExperience);