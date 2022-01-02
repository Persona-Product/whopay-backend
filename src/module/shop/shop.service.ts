import { Injectable } from '@nestjs/common';
import { Shop, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getShop(id: Shop['id']): Promise<Shop> {
    return this.prisma.shop.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateShop(
    id: Shop['id'],
    data: Prisma.ShopUpdateInput,
  ): Promise<Shop> {
    return await this.prisma.shop.update({
      where: { id: id },
      data,
    });
  }

  async deleteShop(id: Shop['id']): Promise<Shop> {
    return await this.prisma.shop.delete({
      where: { id: id },
    });
  }
}
