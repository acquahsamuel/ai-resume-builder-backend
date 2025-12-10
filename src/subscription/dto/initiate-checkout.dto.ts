import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class InitiateCheckoutDto {
  @ApiPropertyOptional({ description: 'Optional payee name' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  payeeName?: string;

  @ApiPropertyOptional({ description: 'Optional payee phone number' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  payeeMobileNumber?: string;

  @ApiPropertyOptional({ description: 'Optional payee email' })
  @IsOptional()
  @IsEmail()
  payeeEmail?: string;

  @ApiPropertyOptional({ description: 'Override return URL after payment' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  returnUrl?: string;

  @ApiPropertyOptional({ description: 'Override cancel URL after payment cancellation' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  cancellationUrl?: string;
}

