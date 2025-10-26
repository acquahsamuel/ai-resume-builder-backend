import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum SkillCategory {
  TECHNICAL = 'Technical',
  LANGUAGE = 'Language',
  SOFT_SKILL = 'Soft Skill',
  OTHER = 'Other'
}

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, index: true })
  userId: number;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: SkillLevel,
    default: SkillLevel.INTERMEDIATE
  })
  level: SkillLevel;

  @Prop({
    type: String,
    enum: SkillCategory,
    default: SkillCategory.TECHNICAL
  })
  category: SkillCategory;

  @Prop({ type: Number, required: false })
  proficiencyRating?: number;

  @Prop({ default: 0 })
  sortOrder: number;

  createdAt: Date;

  updatedAt: Date;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);