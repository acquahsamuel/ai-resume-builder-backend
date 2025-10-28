import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicationDocument = Publication & Document;

@Schema({ timestamps: true })
export class Publication {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  authors: string[];

  @Prop({ required: true })
  publication: string;

  @Prop({ required: false })
  publisher?: string;

  @Prop({ type: Date, required: true })
  publicationDate: Date;

  @Prop({ required: false })
  doi?: string;

  @Prop({ required: false })
  url?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  citations?: number;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);

// Add indexes for query optimization
PublicationSchema.index({ userId: 1, order: 1 });
PublicationSchema.index({ userId: 1, publicationDate: -1 });

