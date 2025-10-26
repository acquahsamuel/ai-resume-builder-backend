import { IsString, IsBoolean, IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateVolunteerDto {
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
  @IsString({ each: true })
  achievements?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  hoursPerWeek?: number;

  @IsOptional()
  order?: number;
}

