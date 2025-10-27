import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: false })
  startDate?: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: false })
  isOngoing: boolean;

  @Prop({ required: false })
  projectUrl?: string;

  @Prop({ required: false })
  liveUrl?: string;

  @Prop({ type: [String], required: true })
  technologies: string[];

  @Prop({ type: [String], required: false })
  achievements?: string[];

  @Prop({ required: false })
  teamSize?: number;

  @Prop({ type: [String], required: false })
  images?: string[];

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

