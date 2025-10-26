import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificationDocument = Certification & Document;

@Schema({ timestamps: true })
export class Certification {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  issuingOrganization: string;

  @Prop({ type: Date, required: true })
  issueDate: Date;

  @Prop({ type: Date, required: false })
  expiryDate?: Date;

  @Prop({ default: false })
  doesNotExpire: boolean;

  @Prop({ required: false })
  credentialId?: string;

  @Prop({ required: false })
  credentialUrl?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  logo?: string;

  @Prop({ default: 0 })
  order: number;

  createdAt: Date;

  updatedAt: Date;
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);

