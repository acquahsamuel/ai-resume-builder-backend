import {
  IsString,
  IsOptional,
  IsArray,
  IsObject,
  IsBoolean,
  IsNumber,
  IsEmail,
  ValidateNested,
  IsEnum,
  IsUrl,
  IsDateString,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

// Header Profile Info DTO
class HeaderProfileInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  otherName?: string;

  @IsString()
  fullName: string;

  @IsString()
  title: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsUrl()
  profilePhoto?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  socialMedia: SocialMediaDto[];
}

class SocialMediaDto {
  @IsString()
  platform: string;

  @IsUrl()
  link: string;
}

// Professional Summary DTO
class ProfessionalSummaryDto {
  @IsString()
  @MaxLength(1000)
  summary: string;

  @IsOptional()
  @IsEnum(['summary', 'objective'])
  summaryType?: 'summary' | 'objective';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

// Work Experience DTO
class WorkExperienceDto {
  @IsString()
  jobTitle: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(['full-time', 'part-time', 'contract', 'freelance', 'internship'])
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];
}

// Education DTO
class EducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsString()
  fieldOfStudy: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isOngoing?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  gpa?: number;

  @IsOptional()
  @IsEnum(['4.0', '5.0', '100'])
  gpaScale?: '4.0' | '5.0' | '100';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  honors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relevantCoursework?: string[];

  @IsOptional()
  @IsString()
  activities?: string;

  @IsOptional()
  @IsString()
  thesis?: string;
}

// Skills DTO
class SkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(['technical', 'soft', 'language', 'tool', 'framework', 'other'])
  category?: 'technical' | 'soft' | 'language' | 'tool' | 'framework' | 'other';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  proficiencyLevel?: number;

  @IsOptional()
  @IsEnum(['beginner', 'intermediate', 'advanced', 'expert'])
  proficiencyLabel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';

  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean;
}

// Certification DTO
class CertificationDto {
  @IsString()
  name: string;

  @IsString()
  issuingOrganization: string;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsBoolean()
  doesNotExpire?: boolean;

  @IsOptional()
  @IsString()
  credentialId?: string;

  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  logo?: string;
}

// Course DTO
class CourseDto {
  @IsString()
  name: string;

  @IsString()
  provider: string;

  @IsDateString()
  completionDate: string;

  @IsOptional()
  @IsUrl()
  certificateUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  hours?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];
}

// Award DTO
class AwardDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// Volunteer DTO
class VolunteerDto {
  @IsString()
  role: string;

  @IsString()
  organization: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  cause?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isOngoing?: boolean;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  hoursPerWeek?: number;
}

// Publication DTO
class PublicationDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  publication: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsDateString()
  publicationDate: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  citations?: number;
}

// Patent DTO
class PatentDto {
  @IsString()
  title: string;

  @IsString()
  patentNumber: string;

  @IsDateString()
  issueDate: string;

  @IsArray()
  @IsString({ each: true })
  inventors: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}

// Project DTO
class ProjectDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isOngoing?: boolean;

  @IsOptional()
  @IsUrl()
  projectUrl?: string;

  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  teamSize?: number;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];
}

// Language DTO
class LanguageDto {
  @IsString()
  language: string;

  @IsEnum(['native', 'fluent', 'professional', 'intermediate', 'basic'])
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';

  @IsOptional()
  @IsEnum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
  proficiencyLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

  @IsOptional()
  @IsBoolean()
  canRead?: boolean;

  @IsOptional()
  @IsBoolean()
  canWrite?: boolean;

  @IsOptional()
  @IsBoolean()
  canSpeak?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
}

// Hobby DTO
class HobbyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  relevance?: string;
}

// Reference DTO
class ReferenceDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  relationship?: string;
}

// Additional Section DTO
class AdditionalSectionDto {
  @IsString()
  sectionTitle: string;

  @IsString()
  details: string;
}

// Main Create CvContent DTO
export class CreateCvContentDto {
  @IsString()
  userId: string;

  @IsString()
  templateId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HeaderProfileInfoDto)
  HeaderProfileInfo?: HeaderProfileInfoDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfessionalSummaryDto)
  ProfessionalSummary?: ProfessionalSummaryDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkExperienceDto)
  Experience?: WorkExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  Education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  Skills?: SkillDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  Certifications?: CertificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  Courses?: CourseDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardDto)
  Awards?: AwardDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VolunteerDto)
  Volunteer?: VolunteerDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PublicationDto)
  Publications?: PublicationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatentDto)
  Patents?: PatentDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  Projects?: ProjectDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  Languages?: LanguageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HobbyDto)
  Hobbies?: HobbyDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceDto)
  References?: ReferenceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalSectionDto)
  AdditionalSections?: AdditionalSectionDto[];
}
