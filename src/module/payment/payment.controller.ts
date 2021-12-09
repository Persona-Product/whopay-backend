import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Store } from '@prisma/client';

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  // GET - /store
  @Get()
  getAllPayment(@Body() { paymentId: id }): Promise<any> {
    return this.paymentsService.getAllPayment(id);
  }
}
