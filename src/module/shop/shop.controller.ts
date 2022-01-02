import { Body, Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { Prisma, Shop } from '@prisma/client';
import { ShopService } from '@shop/shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopsService: ShopService) {}

  // GET - /shop/:id
  @Get(':id')
  getShop(@Param() id: Shop['id']): Promise<Shop> {
    return this.shopsService.getShop(id);
  }

  //PUT - /shop/:id
  @Put(':id')
  updateShop(
    @Param('id') id: Shop['id'],
    @Body() data: Prisma.ShopUpdateInput,
  ): Promise<Shop> {
    return this.shopsService.updateShop(id, data);
  }

  //DELETE - /shop/:id
  @Delete(':id')
  deleteShop(@Param('id') id: Shop['id']): Promise<Shop> {
    return this.shopsService.deleteShop(id);
  }
}
