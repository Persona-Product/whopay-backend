import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [CoreModule, CommonModule, UserModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
