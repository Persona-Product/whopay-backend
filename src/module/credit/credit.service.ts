import { Injectable } from '@nestjs/common';
import { Credit, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async getAllCredit(CreditId: number): Promise<Credit | null> {
    return this.prisma.credit.findUnique({
      where: {
        id: CreditId,
      },
    });
  }

  async createCredit(data: Prisma.CreditCreateInput): Promise<Credit> {
    return await this.prisma.credit.create({
      data,
    });
  }

  async updateCredit(
    CreditId: number,
    data: Prisma.CreditUpdateInput,
  ): Promise<Credit> {
    return await this.prisma.credit.update({
      where: { id: CreditId },
      data,
    });
  }

  async deleteCredit(CreditId: number): Promise<Credit> {
    return await this.prisma.credit.delete({
      where: { id: CreditId },
    });
  }
}
