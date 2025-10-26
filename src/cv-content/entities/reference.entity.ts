import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReferenceDocument = Reference & Document;

@Schema({ timestamps: true })
export class Reference {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  relationship?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);

