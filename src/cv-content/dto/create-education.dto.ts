import { IsString, IsDateString, IsArray, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { GPAScale } from '../entities/education.entity';

export class CreateEducationDto {
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
  // @IsBoolean()
  isOngoing?: boolean;

  @IsOptional()
  @IsNumber()
  gpa?: number;

  @IsOptional()
  @IsEnum(GPAScale)
  gpaScale?: GPAScale;

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}