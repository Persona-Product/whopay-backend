import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetweetResolver } from '@/retweet/retweet.resolver';
import { RetweetService } from '@/retweet/retweet.service';
import { Retweet } from '@/retweet/entity/retweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Retweet])],
  providers: [RetweetResolver, RetweetService],
  controllers: [],
  exports: [],
})
export class RetweetModule {}
