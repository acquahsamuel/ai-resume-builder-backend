import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model, Types } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  Subscription,
  SubscriptionDocument,
  SubscriptionStatus,
} from './entities/subscription.entity';
import { InitiateCheckoutDto } from './dto/initiate-checkout.dto';
import { HubtelCallbackDto } from './dto/hubtel-callback.dto';
import { User, UserDocument } from 'src/user/entities/user.entity';

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);
  private readonly planAmount = 10;
  private readonly trialDays = 14;
  private readonly billingDays = 30;
  private readonly checkoutEndpoint = 'https://payproxyapi.hubtel.com/items/initiate';
  private readonly statusEndpoint = 'https://api-txnstatus.hubtel.com/transactions';

  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
  ) {}

  async ensureTrial(userId: string): Promise<SubscriptionDocument> {
    let subscription = await this.subscriptionModel.findOne({ user: userId }).exec();
    if (!subscription) {
      subscription = new this.subscriptionModel({
        user: new Types.ObjectId(userId),
        planAmount: this.planAmount,
        currency: 'USD',
        trialEndsAt: addDays(new Date(), this.trialDays),
        status: SubscriptionStatus.TRIAL,
      });
      await subscription.save();
    }

    return this.refreshStatus(subscription);
  }

  async getSubscriptionForUser(userId: string): Promise<SubscriptionDocument> {
    return this.ensureTrial(userId);
  }

  private async refreshStatus(
    subscription: SubscriptionDocument,
  ): Promise<SubscriptionDocument> {
    let dirty = false;
    const now = new Date();

    if (
      subscription.status === SubscriptionStatus.TRIAL &&
      subscription.trialEndsAt &&
      subscription.trialEndsAt.getTime() < now.getTime()
    ) {
      subscription.status = SubscriptionStatus.EXPIRED;
      dirty = true;
    }

    if (
      subscription.currentPeriodEnd &&
      subscription.currentPeriodEnd.getTime() < now.getTime() &&
      (subscription.status === SubscriptionStatus.ACTIVE ||
        subscription.status === SubscriptionStatus.PAYMENT_PENDING)
    ) {
      subscription.status = SubscriptionStatus.EXPIRED;
      dirty = true;
    }

    if (dirty) {
      await subscription.save();
    }
    return subscription;
  }

  async initiateCheckout(
    userId: string,
    dto: InitiateCheckoutDto,
  ): Promise<{ checkoutUrl: string; checkoutId: string; clientReference: string }> {
    await this.assertUserExists(userId);
    const subscription = await this.ensureTrial(userId);
    const now = new Date();
    if (
      subscription.status === SubscriptionStatus.ACTIVE &&
      subscription.currentPeriodEnd &&
      subscription.currentPeriodEnd.getTime() > now.getTime()
    ) {
      throw new BadRequestException('Subscription is already active.');
    }

    const clientReference = uuidv4().replace(/-/g, '').slice(0, 32);
    const headers = {
      Authorization: `Basic ${process.env.HUBTEL_AUTH_KEY || ''}`,
      'Content-Type': 'application/json',
    };

    if (!headers.Authorization.trim()) {
      throw new InternalServerErrorException(
        'Missing HUBTEL_AUTH_KEY environment variable.',
      );
    }

    const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;
    if (!merchantAccountNumber) {
      throw new InternalServerErrorException(
        'Missing HUBTEL_MERCHANT_ACCOUNT_NUMBER environment variable.',
      );
    }

    const payload = {
      totalAmount: this.planAmount,
      description: 'Monthly subscription',
      callbackUrl:
        process.env.HUBTEL_CALLBACK_URL ||
        `${process.env.API_BASE_URL || 'http://localhost:3000'}/api/v1/subscriptions/hubtel/callback`,
      returnUrl: dto.returnUrl || process.env.HUBTEL_RETURN_URL || 'http://localhost:3000/payment/success',
      cancellationUrl:
        dto.cancellationUrl ||
        process.env.HUBTEL_CANCELLATION_URL ||
        'http://localhost:3000/payment/cancelled',
      merchantAccountNumber,
      clientReference,
      payeeName: dto.payeeName,
      payeeMobileNumber: dto.payeeMobileNumber,
      payeeEmail: dto.payeeEmail,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.checkoutEndpoint, payload, { headers }),
      );

      if (!response?.data?.data?.checkoutUrl || !response?.data?.data?.checkoutId) {
        this.logger.error(
          `Unexpected Hubtel response: ${JSON.stringify(response?.data)}`,
        );
        throw new InternalServerErrorException('Failed to initiate checkout.');
      }

      subscription.status = SubscriptionStatus.PAYMENT_PENDING;
      subscription.currentClientReference = response.data.data.clientReference || clientReference;
      subscription.currentCheckoutId = response.data.data.checkoutId;
      subscription.lastResponseCode = response.data.responseCode || response.data.ResponseCode;
      subscription.lastStatusText = response.data.status || response.data.Status;
      await subscription.save();

      return {
        checkoutUrl: response.data.data.checkoutUrl,
        checkoutId: response.data.data.checkoutId,
        clientReference: subscription.currentClientReference,
      };
    } catch (error: any) {
      this.logger.error('Hubtel initiation failed', error?.response?.data || error?.message);
      throw new InternalServerErrorException(
        error?.response?.data?.message || 'Failed to initiate checkout.',
      );
    }
  }

  async handleHubtelCallback(body: HubtelCallbackDto) {
    const clientReference = body?.Data?.ClientReference;
    if (!clientReference) {
      throw new BadRequestException('Missing client reference in callback.');
    }

    const subscription = await this.subscriptionModel
      .findOne({ currentClientReference: clientReference })
      .exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found for callback.');
    }

    const statusText = body.Data?.Status || body.Status;
    const responseCode = body.ResponseCode;
    const isSuccess =
      responseCode === '0000' && statusText?.toLowerCase() === 'success';

    if (isSuccess) {
      const now = new Date();
      subscription.status = SubscriptionStatus.ACTIVE;
      subscription.lastPaymentAt = now;
      subscription.currentPeriodEnd = addDays(now, this.billingDays);
      subscription.renewalCount = (subscription.renewalCount || 0) + 1;
    } else {
      subscription.status = SubscriptionStatus.EXPIRED;
    }

    subscription.lastResponseCode = responseCode;
    subscription.lastStatusText = statusText;
    await subscription.save();

    return { received: true };
  }

  async checkStatusAndRefresh(userId: string, clientReference: string) {
    await this.assertUserExists(userId);
    const subscription = await this.subscriptionModel
      .findOne({ user: userId })
      .exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found for user.');
    }

    const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;
    if (!merchantAccountNumber) {
      throw new InternalServerErrorException(
        'Missing HUBTEL_MERCHANT_ACCOUNT_NUMBER environment variable.',
      );
    }

    const headers = {
      Authorization: `Basic ${process.env.HUBTEL_AUTH_KEY || ''}`,
    };
    if (!headers.Authorization.trim()) {
      throw new InternalServerErrorException(
        'Missing HUBTEL_AUTH_KEY environment variable.',
      );
    }

    const url = `${this.statusEndpoint}/${merchantAccountNumber}/status?clientReference=${clientReference}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );

      const data = response?.data?.data;
      if (data?.status?.toLowerCase() === 'paid') {
        const now = new Date();
        subscription.status = SubscriptionStatus.ACTIVE;
        subscription.lastPaymentAt = now;
        subscription.currentPeriodEnd = addDays(now, this.billingDays);
        subscription.renewalCount = (subscription.renewalCount || 0) + 1;
      } else if (data?.status?.toLowerCase() === 'unpaid') {
        subscription.status = SubscriptionStatus.EXPIRED;
      }

      subscription.lastResponseCode = response?.data?.responseCode;
      subscription.lastStatusText = data?.status;
      await subscription.save();

      return {
        status: data?.status,
        responseCode: response?.data?.responseCode,
        amount: data?.amount,
        paymentMethod: data?.paymentMethod,
        clientReference: data?.clientReference,
        currentSubscription: subscription,
      };
    } catch (error: any) {
      this.logger.error(
        'Failed to check transaction status',
        error?.response?.data || error?.message,
      );
      throw new InternalServerErrorException(
        error?.response?.data?.message || 'Failed to check transaction status.',
      );
    }
  }

  private async assertUserExists(userId: string) {
    const exists = await this.userModel.exists({ _id: userId });
    if (!exists) {
      throw new NotFoundException('User not found.');
    }
  }
}

