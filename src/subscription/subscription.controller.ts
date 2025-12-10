import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InitiateCheckoutDto } from './dto/initiate-checkout.dto';
import { HubtelCallbackDto } from './dto/hubtel-callback.dto';
import { SubscriptionService } from './subscription.service';

@ApiTags('subscriptions')
@Controller('api/v1/subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me')
  @ApiOperation({ summary: 'Get current user subscription' })
  @ApiResponse({ status: 200, description: 'Subscription retrieved successfully' })
  async getMine(@Request() req) {
    return this.subscriptionService.getSubscriptionForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('checkout')
  @ApiOperation({ summary: 'Initiate Hubtel checkout for subscription' })
  @ApiResponse({ status: 200, description: 'Checkout initiated' })
  async initiateCheckout(@Body() body: InitiateCheckoutDto, @Request() req) {
    return this.subscriptionService.initiateCheckout(req.user.userId, body);
  }

  @Post('hubtel/callback')
  @ApiOperation({ summary: 'Hubtel payment callback endpoint' })
  @ApiResponse({ status: 200, description: 'Callback processed' })
  async hubtelCallback(@Body() body: HubtelCallbackDto) {
    return this.subscriptionService.handleHubtelCallback(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('status/:clientReference')
  @ApiOperation({ summary: 'Check Hubtel transaction status and refresh subscription' })
  @ApiResponse({ status: 200, description: 'Status retrieved' })
  async status(@Param('clientReference') clientReference: string, @Request() req) {
    return this.subscriptionService.checkStatusAndRefresh(req.user.userId, clientReference);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('renew')
  @ApiOperation({ summary: 'Renew subscription (starts a new checkout if needed)' })
  @ApiResponse({ status: 200, description: 'Renewal initiated' })
  async renew(@Body() body: InitiateCheckoutDto, @Request() req) {
    return this.subscriptionService.initiateCheckout(req.user.userId, body);
  }
}

