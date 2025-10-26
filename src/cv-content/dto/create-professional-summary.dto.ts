import { IsString, IsBoolean, IsOptional, IsEnum, IsArray, MinLength, MaxLength } from 'class-validator';
import { SummaryType } from '../entities/professional-summary.entity';

export class CreateProfessionalSummaryDto {
  @IsEnum(SummaryType)
  summaryType: SummaryType;

  @IsString()
  @MinLength(50)
  @MaxLength(500)
  content: string;

  @IsOptional()
  @IsBoolean()
  aiGenerated?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

