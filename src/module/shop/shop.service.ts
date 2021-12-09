import { Injectable } from '@nestjs/common';
import { Shop, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getAllShop(ShopId: string): Promise<Shop | null> {
    return this.prisma.shop.findUnique({
      where: {
        id: ShopId,
      },
    });
  }

  async createShop(data: Prisma.ShopCreateInput): Promise<Shop> {
    return await this.prisma.shop.create({
      data,
    });
  }

  async updateShop(
    ShopId: string,
    data: Prisma.ShopUpdateInput,
  ): Promise<Shop> {
    return await this.prisma.shop.update({
      where: { id: ShopId },
      data,
    });
  }

  async deleteShop(ShopId: string): Promise<Shop> {
    return await this.prisma.shop.delete({
      where: { id: ShopId },
    });
  }
}
