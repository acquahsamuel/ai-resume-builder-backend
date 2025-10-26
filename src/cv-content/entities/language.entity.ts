import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LanguageProficiency {
  NATIVE = 'native',
  FLUENT = 'fluent',
  PROFESSIONAL = 'professional',
  INTERMEDIATE = 'intermediate',
  BASIC = 'basic'
}

export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export type LanguageDocument = Language & Document;

@Schema({ timestamps: true })
export class Language {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  language: string;

  @Prop({
    type: String,
    enum: LanguageProficiency,
    required: true
  })
  proficiency: LanguageProficiency;

  @Prop({
    type: String,
    enum: CEFRLevel,
    required: false
  })
  proficiencyLevel?: CEFRLevel;

  @Prop({ default: true })
  canRead: boolean;

  @Prop({ default: true })
  canWrite: boolean;

  @Prop({ default: true })
  canSpeak: boolean;

  @Prop({ type: [String], required: false })
  certifications?: string[];

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

