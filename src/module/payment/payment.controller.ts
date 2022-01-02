import { Controller, Get, Param } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentService } from '@payment/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  // GET - /payment
  @Get(':id')
  getPayment(@Param() id: Payment['id']): Promise<Payment> {
    return this.paymentsService.getPayment(id);
  }
}
