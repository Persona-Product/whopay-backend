import { Body, Controller, Post } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { Voice } from '@prisma/client';

@Controller('voice')
export class VoiceController {
  constructor(private voicesService: VoiceService) {}

  // GET - /voice
  @Post()
  createVoice(@Body() data: any): Promise<Voice> {
    return this.voicesService.createVoice(data);
  }
}
