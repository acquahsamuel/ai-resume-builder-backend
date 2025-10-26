import { IsString, IsOptional, IsDateString, IsUrl, IsArray } from 'class-validator';

export class CreatePatentDto {
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

  @IsOptional()
  order?: number;
}

