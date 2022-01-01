import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { UserModule } from '@src/module/user/user.module';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [UserModule, ShopModule],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
