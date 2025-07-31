import { IsString, IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { SkillLevel, SkillCategory } from '../entities/skill.entity';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsEnum(SkillLevel)
  level: SkillLevel;

  @IsEnum(SkillCategory)
  category: SkillCategory;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  proficiencyRating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}