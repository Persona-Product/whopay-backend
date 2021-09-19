import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetResolver } from '@/modules/tweet/tweet.resolver';
import { TweetService } from '@/modules/tweet/tweet.service';
import { Tweet } from './entity/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetResolver, TweetService],
  controllers: [],
  exports: [],
})
export class TweetModule {}
