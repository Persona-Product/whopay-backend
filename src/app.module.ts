import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { PayModule } from './module/pay/pay.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [],
    }),
    CoreModule,
    UserModule,
    PayModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
