import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCvDocumentDto {
  @ApiProperty({
    description: 'Template ID to use for this CV',
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsString()
  templateId: string;

  @ApiProperty({
    description: 'Title of the CV',
    example: 'Software Engineer CV',
    required: false,
    default: 'My Resume',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Description of the CV',
    example: 'CV tailored for software engineering roles',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'List of enabled section keys',
    example: ['HeaderProfileInfo', 'ProfessionalSummary', 'Experience', 'Education'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enabledSections?: string[];

  @ApiProperty({
    description: 'Order of sections in the CV',
    example: ['HeaderProfileInfo', 'ProfessionalSummary', 'Experience', 'Education'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectionOrder?: string[];

  @ApiProperty({
    description: 'Whether this CV should be set as default',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

