import { IsString, IsDateString, IsArray, IsOptional, IsNumber, Min, IsUrl } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  institution: string;

  @IsString()
  degree: string;

  @IsString()
  fieldOfStudy: string;

  @IsOptional()
  @IsUrl()
  institutionWebsite?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  gpa?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coursework?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  extracurricularActivities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  honorsAndAwards?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}