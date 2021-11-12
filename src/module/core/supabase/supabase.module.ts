import { Module } from '@nestjs/common';
import { SupabaseService } from '@core/supabase/supabase.service';
import { SupabaseStrategy } from '@core/supabase/supabase.strategy';
import { JwtStrategy } from '@core/supabase/jwt.strategy';
import { SupabaseJwtAuthGuard } from '@core/supabase/guard/supabase-jwt-auth.guard';
import { SupabaseAuthGuard } from '@core/supabase/guard/supabase-auth.guard';

@Module({
  providers: [
    SupabaseService,
    SupabaseStrategy,
    SupabaseAuthGuard,
    SupabaseJwtAuthGuard,
    JwtStrategy,
  ],
  exports: [
    SupabaseService,
    SupabaseStrategy,
    SupabaseAuthGuard,
    SupabaseJwtAuthGuard,
    JwtStrategy,
  ],
})
export class SupabaseModule {}
