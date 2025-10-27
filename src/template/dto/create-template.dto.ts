import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { TemplateCategory, PageFormat, FontFamily } from '../entities/cv-template.entity';

class LayoutDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sections?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectionOrder?: string[];

  @IsOptional()
  @IsEnum(['portrait', 'landscape'])
  orientation?: 'portrait' | 'landscape';

  @IsOptional()
  @IsNumber()
  columns?: number;

  @IsOptional()
  @IsNumber()
  sectionSpacing?: number;
}

class TypographyDto {
  @IsOptional()
  @IsEnum(FontFamily)
  fontFamily?: FontFamily;

  @IsOptional()
  @IsNumber()
  headingSize?: number;

  @IsOptional()
  @IsNumber()
  subheadingSize?: number;

  @IsOptional()
  @IsNumber()
  bodySize?: number;

  @IsOptional()
  @IsNumber()
  lineHeight?: number;

  @IsOptional()
  @IsString()
  fontWeight?: string;
}

class ThemeDto {
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  accentColor?: string;

  @IsOptional()
  @IsString()
  backgroundColor?: string;

  @IsOptional()
  @IsString()
  textColor?: string;

  @IsOptional()
  @IsString()
  customCSS?: string;
}

class MarginsDto {
  @IsOptional()
  @IsNumber()
  top?: number;

  @IsOptional()
  @IsNumber()
  bottom?: number;

  @IsOptional()
  @IsNumber()
  left?: number;

  @IsOptional()
  @IsNumber()
  right?: number;
}

class PageSettingsDto {
  @IsOptional()
  @IsEnum(PageFormat)
  format?: PageFormat;

  @IsOptional()
  @ValidateNested()
  @Type(() => MarginsDto)
  margins?: MarginsDto;

  @IsOptional()
  @IsBoolean()
  showLineBreaks?: boolean;

  @IsOptional()
  @IsBoolean()
  showPageNumbers?: boolean;

  @IsOptional()
  @IsString()
  pageNumberFormat?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  publicUrl?: string;
}

class StatisticsDto {
  @IsOptional()
  @IsNumber()
  views?: number;

  @IsOptional()
  @IsNumber()
  downloads?: number;

  @IsOptional()
  lastViewedAt?: Date;

  @IsOptional()
  lastDownloadedAt?: Date;
}

class PdfSettingsDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  quality?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsString()
  watermark?: string;
}

class JsonSettingsDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  includeMetadata?: boolean;
}

class ExportSettingsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PdfSettingsDto)
  pdf?: PdfSettingsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => JsonSettingsDto)
  json?: JsonSettingsDto;
}

class NotesDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  lastEditedAt?: Date;
}

class PreviewImageDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  alt?: string;
}

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TemplateCategory)
  category?: TemplateCategory;

  @IsOptional()
  @ValidateNested()
  @Type(() => LayoutDto)
  layout?: LayoutDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TypographyDto)
  typography?: TypographyDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ThemeDto)
  theme?: ThemeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PageSettingsDto)
  pageSettings?: PageSettingsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => StatisticsDto)
  statistics?: StatisticsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExportSettingsDto)
  exportSettings?: ExportSettingsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotesDto)
  notes?: NotesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PreviewImageDto)
  previewImage?: PreviewImageDto;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
