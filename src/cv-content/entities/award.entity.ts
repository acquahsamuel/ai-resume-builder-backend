import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AwardDocument = Award & Document;

@Schema({ timestamps: true })
export class Award {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  issuer: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: false })
  description?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const AwardSchema = SchemaFactory.createForClass(Award);

// Add indexes for query optimization
AwardSchema.index({ userId: 1, order: 1 });
AwardSchema.index({ userId: 1, date: -1 });

