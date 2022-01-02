import { Module } from '@nestjs/common';
import { PaymentController } from '@payment/payment.controller';
import { PaymentService } from '@payment/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
