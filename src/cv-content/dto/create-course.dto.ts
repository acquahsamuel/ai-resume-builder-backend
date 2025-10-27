import { IsString, IsOptional, IsDateString, IsUrl, IsNumber, IsArray, Min } from 'class-validator';

export class CreateCourseDto {
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

  @IsOptional()
  order?: number;
}

