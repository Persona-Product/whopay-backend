import { Module } from '@nestjs/common';
import { SupabaseService } from '@core/supabase/supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
