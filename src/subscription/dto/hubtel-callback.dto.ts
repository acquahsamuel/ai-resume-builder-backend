import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

class HubtelPaymentDetailsDto {
  @IsOptional()
  @IsString()
  MobileMoneyNumber?: string;

  @IsOptional()
  @IsString()
  PaymentType?: string;

  @IsOptional()
  @IsString()
  Channel?: string;
}

class HubtelCallbackDataDto {
  @IsString()
  @ApiProperty()
  CheckoutId: string;

  @IsOptional()
  @IsString()
  SalesInvoiceId?: string;

  @IsString()
  @ApiProperty()
  ClientReference: string;

  @IsString()
  @ApiProperty()
  Status: string;

  @IsNumber()
  @ApiProperty()
  Amount: number;

  @IsOptional()
  @IsString()
  CustomerPhoneNumber?: string;

  @IsOptional()
  @IsObject()
  PaymentDetails?: HubtelPaymentDetailsDto;

  @IsOptional()
  @IsString()
  Description?: string;
}

export class HubtelCallbackDto {
  @IsString()
  @ApiProperty()
  ResponseCode: string;

  @IsString()
  @ApiProperty()
  Status: string;

  @IsObject()
  @ApiProperty({ type: HubtelCallbackDataDto })
  Data: HubtelCallbackDataDto;
}

