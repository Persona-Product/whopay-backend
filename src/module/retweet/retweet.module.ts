import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retweet } from '@src/entity';
import { RetweetResolver } from '@retweet/retweet.resolver';
import { RetweetService } from '@retweet/retweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Retweet])],
  providers: [RetweetResolver, RetweetService],
  controllers: [],
  exports: [],
})
export class RetweetModule {}
