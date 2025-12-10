import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import {
  Subscription,
  SubscriptionSchema,
} from './entities/subscription.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, JwtAuthGuard],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}

