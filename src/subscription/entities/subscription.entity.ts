import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type SubscriptionDocument = Subscription & Document;

export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  PAYMENT_PENDING = 'payment_pending',
  PAST_DUE = 'past_due',
}

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  user: Types.ObjectId;

  @Prop({ enum: SubscriptionStatus, default: SubscriptionStatus.TRIAL })
  status: SubscriptionStatus;

  @Prop({ default: 10 })
  planAmount: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop({
    default: () => addDays(new Date(), 14),
  })
  trialEndsAt: Date;

  @Prop()
  currentPeriodEnd?: Date;

  @Prop()
  lastPaymentAt?: Date;

  @Prop()
  currentCheckoutId?: string;

  @Prop()
  currentClientReference?: string;

  @Prop({ default: 0 })
  renewalCount: number;

  @Prop()
  lastResponseCode?: string;

  @Prop()
  lastStatusText?: string;

  createdAt: Date;

  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
SubscriptionSchema.index({ user: 1 }, { unique: true });

