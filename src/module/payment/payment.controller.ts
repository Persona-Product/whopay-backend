import { Controller, Post, Body } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PaymentService } from '@payment/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  // POST - /payment
  @Post()
  paymentTransaction(
    @Body() createBody: Prisma.PaymentCreateInput,
  ): Promise<Payment> {
    return this.paymentsService.paymentTransaction(createBody);
  }
}
