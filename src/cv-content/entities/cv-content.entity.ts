import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CvContentDocument = CvContent & Document;

@Schema({ timestamps: true })
export class CvContent {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  templateId: string;

  @Prop({ type: Object, required: false })
  HeaderProfileInfo?: {
    firstname: string;
    lastname: string;
    othername: string;
    fullname: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    dateOfBirth?: string;
    socialMedia: Array<{
      platform: string;
      link: string;
    }>;
  };

  @Prop({ type: Object, required: false })
  ProfessionalSummary?: {
    summary: string;
  };

  @Prop({ type: [Object], required: false })
  Education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    institutionWebsite?: string;
    startDate: string;
    endDate: string;
  }>;

  @Prop({ type: [Object], required: false })
  Experience?: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;

  // Skills section
  @Prop({ type: [Object], required: false })
  Skills?: Array<{
    skill: string;
    proficiency: string;
    level?: string;
  }>;

  // Certifications section
  @Prop({ type: [Object], required: false })
  Certifications?: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expirationDate?: string;
    credentialId?: string;
    summary?: string;
  }>;

  // Hobbies section
  @Prop({ type: [Object], required: false })
  Hobbies?: Array<{
    hobby: string;
  }>;

  // Reference section
  @Prop({ type: [Object], required: false })
  Reference?: Array<{
    referenceName: string;
    contactPerson: string;
    contactPhone: string[];
    contactEmail?: string;
  }>;

  // Projects section
  @Prop({ type: [Object], required: false })
  Projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;

  // Languages spoken
  @Prop({ type: [Object], required: false })
  Languages?: Array<{
    language: string;
    proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
  }>;

  // Additional sections (e.g., volunteering, awards)
  @Prop({ type: [Object], required: false })
  AdditionalSections?: Array<{
    sectionTitle: string;
    details: string;
  }>;

  createdAt: Date;

  updatedAt: Date;
}

export const CvContentSchema = SchemaFactory.createForClass(CvContent);
