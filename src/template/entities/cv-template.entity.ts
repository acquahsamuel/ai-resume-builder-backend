import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TemplateCategory {
  MODERN = 'modern',
  CLASSIC = 'classic',
  CREATIVE = 'creative',
  MINIMALIST = 'minimalist',
  PROFESSIONAL = 'professional',
}

export enum PageFormat {
  A4 = 'A4',
  LETTER = 'Letter',
  LEGAL = 'Legal',
}

export enum FontFamily {
  ARIAL = 'Arial',
  HELVETICA = 'Helvetica',
  TIMES = 'Times New Roman',
  GEORGIA = 'Georgia',
  COURIER = 'Courier New',
}

export type CvTemplateDocument = CvTemplate & Document;

@Schema({ timestamps: true })
export class CvTemplate {
  // Basic Info
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    type: String,
    enum: TemplateCategory,
    default: TemplateCategory.PROFESSIONAL
  })
  category: TemplateCategory;

  // Layout Settings
  @Prop({
    type: {
      sections: { type: [String], default: [] },
      sectionOrder: { type: [String], default: [] },
      orientation: { type: String, enum: ['portrait', 'landscape'], default: 'portrait' },
      columns: { type: Number, default: 1 },
      sectionSpacing: { type: Number, default: 16 },
    },
    required: false,
    _id: false
  })
  layout?: {
    sections: string[];
    sectionOrder: string[];
    orientation: 'portrait' | 'landscape';
    columns: number;
    sectionSpacing: number;
  };

  // Typography
  @Prop({
    type: {
      fontFamily: { type: String, enum: Object.values(FontFamily), default: FontFamily.HELVETICA },
      headingSize: { type: Number, default: 18 },
      subheadingSize: { type: Number, default: 14 },
      bodySize: { type: Number, default: 11 },
      lineHeight: { type: Number, default: 1.5 },
      fontWeight: { type: String, default: 'normal' },
    },
    required: false,
    _id: false
  })
  typography?: {
    fontFamily: FontFamily;
    headingSize: number;
    subheadingSize: number;
    bodySize: number;
    lineHeight: number;
    fontWeight: string;
  };

  // Theme & Colors
  @Prop({
    type: {
      primaryColor: { type: String, default: '#000000' },
      secondaryColor: { type: String, default: '#666666' },
      accentColor: { type: String, default: '#0066CC' },
      backgroundColor: { type: String, default: '#FFFFFF' },
      textColor: { type: String, default: '#000000' },
      customCSS: { type: String, default: '' },
    },
    required: false,
    _id: false
  })
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    customCSS?: string;
  };

  // Page Settings
  @Prop({
    type: {
      format: { type: String, enum: Object.values(PageFormat), default: PageFormat.A4 },
      margins: {
        top: { type: Number, default: 20 },
        bottom: { type: Number, default: 20 },
        left: { type: Number, default: 20 },
        right: { type: Number, default: 20 },
      },
      showLineBreaks: { type: Boolean, default: false },
      showPageNumbers: { type: Boolean, default: false },
      pageNumberFormat: { type: String, default: '1' },
      isPublic: { type: Boolean, default: false },
      publicUrl: { type: String, required: false },
    },
    required: false,
    _id: false
  })
  pageSettings?: {
    format: PageFormat;
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    showLineBreaks: boolean;
    showPageNumbers: boolean;
    pageNumberFormat: string;
    isPublic: boolean;
    publicUrl?: string;
  };

  // Statistics (for public resumes)
  @Prop({
    type: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      lastViewedAt: { type: Date, required: false },
      lastDownloadedAt: { type: Date, required: false },
    },
    required: false,
    _id: false
  })
  statistics?: {
    views: number;
    downloads: number;
    lastViewedAt?: Date;
    lastDownloadedAt?: Date;
  };

  // Export Settings
  @Prop({
    type: {
      pdf: {
        enabled: { type: Boolean, default: true },
        quality: { type: String, enum: ['low', 'medium', 'high'], default: 'high' },
        watermark: { type: String, default: '' },
      },
      json: {
        enabled: { type: Boolean, default: true },
        includeMetadata: { type: Boolean, default: false },
      },
    },
    required: false,
    _id: false
  })
  exportSettings?: {
    pdf: {
      enabled: boolean;
      quality: 'low' | 'medium' | 'high';
      watermark?: string;
    };
    json: {
      enabled: boolean;
      includeMetadata: boolean;
    };
  };

  // Personal Notes (Private)
  @Prop({
    type: {
      content: { type: String, default: '' },
      lastEditedAt: { type: Date, default: Date.now },
    },
    required: false,
    _id: false
  })
  notes?: {
    content: string;
    lastEditedAt: Date;
  };

  // Preview
  @Prop({
    type: {
      url: { type: String, required: false },
      alt: { type: String, default: 'Template preview' },
    },
    required: false,
    _id: false
  })
  previewImage?: {
    url: string;
    alt: string;
  };

  // Metadata
  @Prop({ default: false })
  isPremium: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ default: 0 })
  rating: number;

  createdAt: Date;
  updatedAt: Date;
}

export const CvTemplateSchema = SchemaFactory.createForClass(CvTemplate);
