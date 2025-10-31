import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ type: Date, required: true })
  completionDate: Date;

  @Prop({ required: false })
  certificateUrl?: string;

  @Prop({ required: false })
  hours?: number;

  @Prop({ type: [String], required: false })
  skills?: string[];

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Add indexes for query optimization
CourseSchema.index({ userId: 1, order: 1 });
CourseSchema.index({ userId: 1, completionDate: -1 });

