import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HobbyDocument = Hobby & Document;

@Schema({ timestamps: true })
export class Hobby {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  relevance?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const HobbySchema = SchemaFactory.createForClass(Hobby);

// Add indexes for query optimization
HobbySchema.index({ userId: 1, order: 1 });

