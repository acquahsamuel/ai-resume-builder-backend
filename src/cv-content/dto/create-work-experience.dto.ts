import { IsString, IsDateString, IsBoolean, IsArray, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  jobTitle: string;

  @IsString()
  company: string;

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
  @IsBoolean()
  currentlyWorking?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  jobDescriptions?: string[];

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}