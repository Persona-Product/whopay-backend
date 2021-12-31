import { Injectable } from '@nestjs/common';
import { Voice, Prisma } from '@prisma/client';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class VoiceService {
  constructor(private prisma: PrismaService) {}

  async createVoice(data: Prisma.VoiceCreateInput): Promise<Voice> {
    return await this.prisma.voice.create({
      data,
    });
  }
}
