import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TemplateCategory {
  MODERN = 'Modern',
  CLASSIC = 'Classic',
  CREATIVE = 'Creative',
  MINIMALIST = 'Minimalist',
  PROFESSIONAL = 'Professional',
}

export type CvTemplateDocument = CvTemplate & Document;

@Schema({ timestamps: true })
export class CvTemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    type: String,
    enum: TemplateCategory,
    default: TemplateCategory.MODERN
  })
  category: TemplateCategory;

  @Prop({ type: Object, required: true })
  layout: {
    sections: string[];
    sectionOrder: string[];
    styling: {
      primaryColor: string;
      secondaryColor: string;
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
    };
    pageFormat: {
      size: 'A4' | 'Letter';
      margin: number;
    };
  };

  @Prop({ type: Object, required: false })
  previewImage?: {
    url: string;
    alt: string;
  };

  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ type: Number, default: 0 })
  rating: number;

  createdAt: Date;

  updatedAt: Date;
}

export const CvTemplateSchema = SchemaFactory.createForClass(CvTemplate);