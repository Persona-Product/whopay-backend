import { Injectable } from '@nestjs/common';
import { Credit, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class CreditService {
  constructor(private prisma: PrismaService) {}

  async getAllCredit(id: Credit['id']): Promise<Credit> {
    return this.prisma.credit.findUnique({
      where: { id },
    });
  }

  async createCredit(data: Prisma.CreditCreateInput): Promise<Credit> {
    return await this.prisma.credit.create({
      data,
    });
  }

  async updateCredit(
    id: Credit['id'],
    data: Prisma.CreditUpdateInput,
  ): Promise<Credit> {
    return await this.prisma.credit.update({
      where: { id },
      data,
    });
  }

  async deleteCredit(id: Credit['id']): Promise<Credit> {
    return await this.prisma.credit.delete({
      where: { id },
    });
  }
}
