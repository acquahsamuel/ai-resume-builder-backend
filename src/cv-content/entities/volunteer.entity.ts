import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VolunteerDocument = Volunteer & Document;

@Schema({ timestamps: true })
export class Volunteer {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  organization: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ required: false })
  cause?: string;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: false })
  isOngoing: boolean;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: false })
  achievements?: string[];

  @Prop({ required: false })
  hoursPerWeek?: number;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);

// Add indexes for query optimization
VolunteerSchema.index({ userId: 1, order: 1 });
VolunteerSchema.index({ userId: 1, startDate: -1 });

