import { Body, Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  // GET - /store
  @Get()
  getAllPayment(@Body() { paymentId: id }): Promise<any> {
    return this.paymentsService.getAllPayment(id);
  }
}
