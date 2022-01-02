import { Module } from '@nestjs/common';
import { CreditController } from '@credit/credit.controller';
import { CreditService } from '@credit/credit.service';
import { UserModule } from '@user/user.module';
import { ShopModule } from '@shop/shop.module';

@Module({
  imports: [UserModule, ShopModule],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
