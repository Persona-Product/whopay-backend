import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@src/module/user/user.module';
import { VoiceModule } from './module/voice/voice.module';
import { CreditModule } from './module/credit/credit.module';
import { PaymentModule } from './module/payment/payment.module';
import { ShopModule } from './module/shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [],
    }),
    CoreModule,
    UserModule,
    VoiceModule,
    CreditModule,
    PaymentModule,
    ShopModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
