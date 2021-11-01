import { Module } from '@nestjs/common';
import { AuthController } from '@core/auth/auth.controller';
import { AuthService } from '@core/auth/auth.service';
import { SupabaseModule } from '@core/supabase/supabase.module';
// import { SupabaseStrategy } from '@core/supabase/supabase.strategy';
// import { JwtStrategy } from '@core/auth/jwt.strategy';
// import { JwtSupabaseAuthGuard } from '@core/auth/guard/jwt-supabase-auth.guard';
// import { LocalSupabaseAuthGuard } from '@core/auth/guard/local-supabase-auth.guard';

@Module({
  imports: [SupabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    // SupabaseStrategy,
    // JwtStrategy,
    // LocalSupabaseAuthGuard,
    // JwtSupabaseAuthGuard,
  ],
  exports: [
    AuthService,
    // SupabaseStrategy,
    // JwtStrategy,
    // LocalSupabaseAuthGuard,
    // JwtSupabaseAuthGuard,
  ],
})
export class AuthModule {}
