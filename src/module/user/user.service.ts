import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: User['id']): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: User['id'],
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: User['id']): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
