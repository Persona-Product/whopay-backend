import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, Voice } from '@prisma/client';
import { VoiceService } from '@voice/voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private voicesService: VoiceService) {}

  // POST - /voice
  @Post()
  createVoice(@Body() createBody: Prisma.VoiceCreateInput): Promise<Voice> {
    return this.voicesService.createVoice(createBody);
  }
}
