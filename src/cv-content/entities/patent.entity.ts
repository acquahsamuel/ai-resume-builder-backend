import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatentDocument = Patent & Document;

@Schema({ timestamps: true })
export class Patent {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  patentNumber: string;

  @Prop({ type: Date, required: true })
  issueDate: Date;

  @Prop({ type: [String], required: true })
  inventors: string[];

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  url?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const PatentSchema = SchemaFactory.createForClass(Patent);

// Add indexes for query optimization
PatentSchema.index({ userId: 1, order: 1 });
PatentSchema.index({ userId: 1, issueDate: -1 });

