import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@core/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaModule],
  exports: [PrismaModule],
})
export class CoreModule {}
