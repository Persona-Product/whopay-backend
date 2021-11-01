import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@core/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';

@Global()
@Module({
  imports: [AuthModule, PrismaModule, SupabaseModule],
  exports: [AuthModule, PrismaModule, SupabaseModule],
})
export class CoreModule {}
