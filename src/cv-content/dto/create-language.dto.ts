import { IsString, IsBoolean, IsOptional, IsArray, IsEnum } from 'class-validator';
import { LanguageProficiency, CEFRLevel } from '../entities/language.entity';

export class CreateLanguageDto {
  @IsString()
  language: string;

  @IsEnum(LanguageProficiency)
  proficiency: LanguageProficiency;

  @IsOptional()
  @IsEnum(CEFRLevel)
  proficiencyLevel?: CEFRLevel;

  @IsOptional()
  @IsBoolean()
  canRead?: boolean;

  @IsOptional()
  @IsBoolean()
  canWrite?: boolean;

  @IsOptional()
  @IsBoolean()
  canSpeak?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  order?: number;
}

