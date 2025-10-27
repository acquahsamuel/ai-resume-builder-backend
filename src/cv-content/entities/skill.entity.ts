import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SkillProficiencyLabel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum SkillCategory {
  TECHNICAL = 'technical',
  SOFT = 'soft',
  LANGUAGE = 'language',
  TOOL = 'tool',
  FRAMEWORK = 'framework',
  OTHER = 'other'
}

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: SkillCategory,
    required: true
  })
  category: SkillCategory;

  @Prop({ required: true, min: 1, max: 10 })
  proficiencyLevel: number;

  @Prop({
    type: String,
    enum: SkillProficiencyLabel,
    required: false
  })
  proficiencyLabel?: SkillProficiencyLabel;

  @Prop({ required: false })
  yearsOfExperience?: number;

  @Prop({ type: Date, required: false })
  lastUsed?: Date;

  @Prop({ type: [String], required: false })
  certifications?: string[];

  @Prop({ required: false })
  endorsements?: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: false })
  isHighlighted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);