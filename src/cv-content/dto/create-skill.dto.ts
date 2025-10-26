import { IsString, IsEnum, IsOptional, IsNumber, Min, Max, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { SkillCategory, SkillProficiencyLabel } from '../entities/skill.entity';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillCategory)
  category: SkillCategory;

  @IsNumber()
  @Min(1)
  @Max(10)
  proficiencyLevel: number;

  @IsOptional()
  @IsEnum(SkillProficiencyLabel)
  proficiencyLabel?: SkillProficiencyLabel;

  @IsOptional()
  @IsNumber()
  @Min(0)
  yearsOfExperience?: number;

  @IsOptional()
  @IsDateString()
  lastUsed?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsNumber()
  endorsements?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean;
}