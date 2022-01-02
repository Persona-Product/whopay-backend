import { Body, Controller, Post } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { Prisma, Voice } from '@prisma/client';

@Controller('voice')
export class VoiceController {
  constructor(private voicesService: VoiceService) {}

  // POST - /voice
  @Post()
  createVoice(@Body() createBody: Prisma.VoiceCreateInput): Promise<Voice> {
    return this.voicesService.createVoice(createBody);
  }
}
