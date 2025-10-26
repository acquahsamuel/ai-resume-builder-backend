import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  templateName: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: String, required: true })
  html: string;

  @Prop({ default: false })
  isOnlyForSubscribers: boolean;

  @Prop({ default: 'template-sheet' })
  slug: string;

  createdAt: Date;

  updatedAt: Date;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
