import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { SupabaseModule } from '@core/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [VoiceController],
  providers: [VoiceService],
})
export class VoiceModule {}
