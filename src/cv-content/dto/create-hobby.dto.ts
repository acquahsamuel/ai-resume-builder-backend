import { IsString, IsOptional } from 'class-validator';

export class CreateHobbyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  relevance?: string;

  @IsOptional()
  order?: number;
}

