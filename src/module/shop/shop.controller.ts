import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Header,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from '@prisma/client';

@Controller('shop')
export class ShopController {
  constructor(private shopsService: ShopService) {}

  // GET - /Shop
  @Get()
  @Header('shoptoken', 'token')
  getAllShop(@Body() { shopId: id }): Promise<any> {
    return this.shopsService.getAllShop(id);
  }

  // POST - /Shop
  @Post()
  createShop(@Body() data: any): Promise<Shop> {
    return this.shopsService.createShop(data);
  }

  //PUT - /Shop
  @Put()
  updateShop(@Body() { ShopId: id, data: data }): Promise<Shop> {
    return this.shopsService.updateShop(id, data);
  }

  // @Header('userToken', 'token')
  //DELETE - /Shop
  @Delete()
  deleteShop(@Body() { ShopId: id }): Promise<Shop> {
    return this.shopsService.deleteShop(id);
  }
}
