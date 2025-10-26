import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAwardDto {
  @IsString()
  title: string;

  @IsString()
  issuer: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  order?: number;
}

