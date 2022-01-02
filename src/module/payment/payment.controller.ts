import { Controller, Post, Body } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PaymentService } from '@payment/payment.service';
import { PythonShell } from 'python-shell';

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  @Post('test')
  test() {
    return PythonShell.run('index.py', null, (err, results) => {
      if (err) throw err;
      console.log(results);
    });
  }

  // POST - /payment
  @Post()
  paymentTransaction(
    @Body() createBody: Prisma.PaymentCreateInput,
  ): Promise<Payment> {
    return this.paymentsService.paymentTransaction(createBody);
  }
}
