import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Put,
} from '@nestjs/common';
import { CreditService } from './credit.service';
import { Credit } from '@prisma/client';

@Controller('credit')
export class CreditController {
  constructor(private creditsService: CreditService) {}

  // GET - /credit
  @Get()
  getAllCredit(@Body() { creditId: id }): Promise<any> {
    return this.creditsService.getAllCredit(id);
  }

  @Post()
  createCredit(@Body() data: any): Promise<Credit> {
    return this.creditsService.createCredit(data);
  }

  @Put()
  updateStore(@Body() { creditId: id, data: data }): Promise<Credit> {
    return this.creditsService.updateCredit(id, data);
  }

  @Delete()
  @Header('usertoken', 'token')
  deleteStore(@Body() { creditId: id }): Promise<Credit> {
    return this.creditsService.deleteCredit(id);
  }
}
