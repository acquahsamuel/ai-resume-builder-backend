import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CvDocumentDocument = CvDocument & Document;

@Schema({ timestamps: true })
export class CvDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  templateId: string;

  @Prop({ required: false, default: 'My Resume' })
  title: string;

  @Prop({ required: false, default: '' })
  description?: string;

  @Prop({ required: false, default: false })
  isDefault: boolean;

  // Section configuration per CV
  @Prop({ type: [String], required: false })
  enabledSections?: string[]; // List of enabled section keys (e.g., ['HeaderProfileInfo', 'ProfessionalSummary', 'Experience'])

  @Prop({ type: [String], required: false })
  sectionOrder?: string[]; // Custom order for sections (e.g., ['HeaderProfileInfo', 'ProfessionalSummary', 'Experience', 'Education'])

  // Header and Personal Information
  @Prop({ type: Object, required: false })
  HeaderProfileInfo?: {
    firstName: string;
    lastName: string;
    otherName?: string;
    fullName: string;
    title: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    country: string;
    zipCode?: string;
    postalCode?: string;
    dateOfBirth?: string;
    nationality?: string;
    profilePhoto?: string;
    socialMedia?: Record<string, string>; 
  };

  // Professional Summary
  @Prop({ type: Object, required: false })
  ProfessionalSummary?: {
    summary: string;
    summaryType?: 'summary' | 'objective';
    keywords?: string[];
  };

  // Work Experience - Enhanced
  @Prop({ type: [Object], required: false })
  Experience?: Array<{
    jobTitle: string;
    company: string;
    location?: string;
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    responsibilities?: string[];
    achievements?: string[];
    technologies?: string[];
  }>;

  // Education - Enhanced
  @Prop({ type: [Object], required: false })
  Education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isOngoing?: boolean;
    gpa?: number;
    gpaScale?: '4.0' | '5.0' | '100';
    honors?: string[];
    relevantCoursework?: string[];
    activities?: string;
    thesis?: string;
  }>;

  // Skills - Enhanced
  @Prop({ type: [Object], required: false })
  Skills?: Array<{
    name: string;
    category?: 'technical' | 'soft' | 'language' | 'tool' | 'framework' | 'other';
    proficiencyLevel?: number; // 1-10
    proficiencyLabel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsOfExperience?: number;
    certifications?: string[];
    isHighlighted?: boolean;
  }>;

  // Certifications - Enhanced
  @Prop({ type: [Object], required: false })
  Certifications?: Array<{
    name: string;
    issuingOrganization: string;
    issueDate: string;
    expiryDate?: string;
    doesNotExpire?: boolean;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    logo?: string;
  }>;

  // Courses (NEW SECTION)
  @Prop({ type: [Object], required: false })
  Courses?: Array<{
    name: string;
    provider: string;
    completionDate: string;
    certificateUrl?: string;
    hours?: number;
    skills?: string[];
  }>;

  // Awards (NEW SECTION)
  @Prop({ type: [Object], required: false })
  Awards?: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;

  // Volunteer Work (NEW SECTION)
  @Prop({ type: [Object], required: false })
  Volunteer?: Array<{
    role: string;
    organization: string;
    location?: string;
    cause?: string;
    startDate: string;
    endDate?: string;
    isOngoing?: boolean;
    description: string;
    achievements?: string[];
    hoursPerWeek?: number;
  }>;

  // Publications (NEW SECTION)
  @Prop({ type: [Object], required: false })
  Publications?: Array<{
    title: string;
    authors: string[];
    publication: string;
    publisher?: string;
    publicationDate: string;
    doi?: string;
    url?: string;
    description?: string;
    citations?: number;
  }>;

  // Patents (NEW SECTION)
  @Prop({ type: [Object], required: false })
  Patents?: Array<{
    title: string;
    patentNumber: string;
    issueDate: string;
    inventors: string[];
    description?: string;
    url?: string;
  }>;

  // Projects - Enhanced
  @Prop({ type: [Object], required: false })
  Projects?: Array<{
    name: string;
    role: string;
    description: string;
    startDate?: string;
    endDate?: string;
    isOngoing?: boolean;
    projectUrl?: string;
    liveUrl?: string;
    technologies: string[];
    achievements?: string[];
    teamSize?: number;
    images?: string[];
  }>;

  // Languages - Enhanced
  @Prop({ type: [Object], required: false })
  Languages?: Array<{
    language: string;
    proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
    proficiencyLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
    canRead?: boolean;
    canWrite?: boolean;
    canSpeak?: boolean;
    certifications?: string[];
  }>;

  // Hobbies - Enhanced
  @Prop({ type: [Object], required: false })
  Hobbies?: Array<{
    name: string;
    description?: string;
    relevance?: string;
  }>;

  // References - Enhanced
  @Prop({ type: [Object], required: false })
  References?: Array<{
    name: string;
    title: string;
    company: string;
    email: string;
    phone?: string;
    relationship?: string;
  }>;

  // Additional sections for flexibility
  @Prop({ type: [Object], required: false })
  AdditionalSections?: Array<{
    sectionTitle: string;
    details: string;
  }>;

  createdAt: Date;

  updatedAt: Date;
}

export const CvDocumentSchema = SchemaFactory.createForClass(CvDocument);

// Add indexes for query optimization
CvDocumentSchema.index({ userId: 1 });
CvDocumentSchema.index({ templateId: 1 });
CvDocumentSchema.index({ createdAt: -1 });
CvDocumentSchema.index({ userId: 1, isDefault: 1 });
