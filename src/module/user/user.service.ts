import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
