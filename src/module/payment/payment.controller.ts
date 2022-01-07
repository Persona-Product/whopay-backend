import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from '@payment/payment.service';
import { Payment } from '@prisma/client';

type PayBody = {
  shopId: string;
  passcode: string;
  amount: number;
  voiceFile: string;
};

type PaymentResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  Shop: {
    id: string;
    shopName: string;
  };
};
type PaymentShopResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  User: {
    id: string;
    firstName: string;
    lastName: string;
  };
};
type PaymentDetailResult = {
  id: number;
  amount: number;
  updatedAt: Date;
  User: {
    id: string;
    firstName: string;
    lastName: string;
  };
  Shop: {
    id: string;
    shopName: string;
  };
};

@Controller('payment')
export class PaymentController {
  constructor(private paymentsService: PaymentService) {}

  @Get('user/:id/:year/:month')
  getPaymentUserList(
    @Param('id') id: Payment['userId'],
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<PaymentResult[]> {
    return this.paymentsService.getPaymentUserList(id, year, month);
  }

  @Get('shop/:id/:year/:month')
  getPaymentShopList(
    @Param('id') id: Payment['shopId'],
    @Param('year') year: string,
    @Param('month') month: string,
  ): Promise<PaymentShopResult[]> {
    return this.paymentsService.getPaymentShopList(id, year, month);
  }

  @Get(':id')
  getPayment(@Param('id') id: Payment['id']): Promise<PaymentDetailResult> {
    return this.paymentsService.getPayment(Number(id));
  }

  // POST - /payment
  @Post()
  paymentTransaction(@Body() payBody: PayBody): Promise<{ result: boolean }> {
    return this.paymentsService.paymentTransaction(payBody);
  }
}
