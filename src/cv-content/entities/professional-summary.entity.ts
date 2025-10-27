import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SummaryType {
  SUMMARY = 'summary',
  OBJECTIVE = 'objective'
}

export type ProfessionalSummaryDocument = ProfessionalSummary & Document;

@Schema({ timestamps: true })
export class ProfessionalSummary {
  @Prop({ required: true, unique: true, index: true })
  userId: string;

  @Prop({
    type: String,
    enum: SummaryType,
    required: true
  })
  summaryType: SummaryType;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: false })
  content?: string;

  @Prop({ default: false })
  aiGenerated: boolean;

  @Prop({ type: [String], required: false })
  keywords?: string[];

  createdAt: Date;

  updatedAt: Date;
}

export const ProfessionalSummarySchema = SchemaFactory.createForClass(ProfessionalSummary);

