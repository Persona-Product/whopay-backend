import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { Credit, Prisma } from '@prisma/client';
import { CreditService } from '@credit/credit.service';

@Controller('credit')
export class CreditController {
  constructor(private creditsService: CreditService) {}

  // GET - /credit:id
  @Get(':id')
  getAllCredit(@Param('id') id: Credit['id']): Promise<Credit> {
    return this.creditsService.getAllCredit(id);
  }

  // POST - /credit
  @Post()
  createCredit(@Body() createBody: Prisma.CreditCreateInput): Promise<Credit> {
    return this.creditsService.createCredit(createBody);
  }

  // PUT - /credit/:id
  @Put(':id')
  updateCredit(
    @Param('id') id: Credit['id'],
    @Body() updateBody: Prisma.CreditUpdateInput,
  ): Promise<Credit> {
    return this.creditsService.updateCredit(id, updateBody);
  }

  // DLETE - /credit/:id
  @Delete(':id')
  deleteCredit(@Param('id') id: Credit['id']): Promise<Credit> {
    return this.creditsService.deleteCredit(id);
  }
}
