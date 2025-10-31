import { IsString, IsEmail, IsOptional, IsDateString, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreatePersonalInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  otherName?: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @Transform(({ value }) => {
    // If it's an array, convert to key-value object
    if (Array.isArray(value)) {
      return value.reduce((acc, item) => {
        if (item && item.platform && item.link) {
          acc[item.platform] = item.link;
        }
        return acc;
      }, {});
    }
    // If it's already an object, return as is
    return value;
  })
  @IsObject()
  socialMedia?: Record<string, string> | Array<{ platform: string; link: string }>;
}

// Supporting class for array validation (optional)
class SocialMediaItemDto {
  @IsString()
  platform: string;

  @IsString()
  link: string;
}

