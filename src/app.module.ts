import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { VoiceModule } from '@voice/voice.module';
import { CreditModule } from '@credit/credit.module';
import { PaymentModule } from '@payment/payment.module';
import { ShopModule } from '@shop/shop.module';

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
