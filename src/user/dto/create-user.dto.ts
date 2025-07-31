import { IsEmail, IsString, IsOptional, MinLength, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SocialMediaDto {
  @IsString()
  platform: string;

  @IsString()
  link: string;
}

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly city?: string;

  @IsOptional()
  @IsString()
  readonly country?: string;

  @IsOptional()
  @IsString()
  readonly postalCode?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaDto)
  readonly socialMedia?: SocialMediaDto[];
}


