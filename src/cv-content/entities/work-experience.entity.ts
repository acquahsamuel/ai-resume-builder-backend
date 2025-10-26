import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkExperienceDocument = WorkExperience & Document;

@Schema({ timestamps: true })
export class WorkExperience {
  @Prop({ required: true, index: true })
  userId: number;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: false })
  city?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: false })
  currentlyWorking: boolean;

  @Prop({ type: [String], required: false })
  jobDescriptions?: string[];

  @Prop({ type: String, required: false })
  summary?: string;

  @Prop({ default: 0 })
  sortOrder: number;

  createdAt: Date;

  updatedAt: Date;
}

export const WorkExperienceSchema = SchemaFactory.createForClass(WorkExperience);