import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from '@payment/payment.service';

type PayBody = {
  shopId: string;
  passcode: string;
  amount: number;
  voiceFile: string;
};

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  // POST - /payment
  @Post()
  paymentTransaction(@Body() payBody: PayBody): Promise<{ result: boolean }> {
    return this.paymentsService.paymentTransaction(payBody);
  }
}
