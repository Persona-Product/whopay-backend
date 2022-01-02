import { Module } from '@nestjs/common';
import { ShopController } from '@shop/shop.controller';
import { ShopService } from '@shop/shop.service';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
