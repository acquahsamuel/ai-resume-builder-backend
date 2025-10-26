import { IsString, IsBoolean, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateCertificationDto {
  @IsString()
  name: string;

  @IsString()
  issuingOrganization: string;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsBoolean()
  doesNotExpire?: boolean;

  @IsOptional()
  @IsString()
  credentialId?: string;

  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  order?: number;
}

