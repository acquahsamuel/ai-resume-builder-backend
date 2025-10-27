import { IsString, IsBoolean, IsOptional, IsEnum, IsArray, MinLength, MaxLength } from 'class-validator';
import { SummaryType } from '../entities/professional-summary.entity';

export class CreateProfessionalSummaryDto {
  @IsEnum(SummaryType)
  summaryType: SummaryType;

  @IsString()
  @MinLength(50)
  @MaxLength(1000)
  summary: string;

  @IsOptional()
  @IsBoolean()
  aiGenerated?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

