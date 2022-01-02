import { Module } from '@nestjs/common';
import { VoiceController } from '@voice/voice.controller';
import { VoiceService } from '@voice/voice.service';
import { SupabaseModule } from '@core/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
