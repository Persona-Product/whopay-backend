import { Module } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
