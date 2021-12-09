import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { UserModule } from '@src/module/user/user.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [UserModule, StoreModule],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
