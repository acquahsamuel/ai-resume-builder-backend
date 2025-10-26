import { IsString, IsNumber, IsOptional, IsDateString, IsUrl, IsArray } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  authors: string[];

  @IsString()
  publication: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsDateString()
  publicationDate: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  citations?: number;

  @IsOptional()
  order?: number;
}

