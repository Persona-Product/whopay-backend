import { Injectable } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getAllPayment(paymentId: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });
  }
}
