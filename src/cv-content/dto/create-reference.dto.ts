import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateReferenceDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  relationship?: string;

  @IsOptional()
  order?: number;
}

