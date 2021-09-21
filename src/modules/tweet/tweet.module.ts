import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetResolver } from '@/tweet/tweet.resolver';
import { TweetService } from '@/tweet/tweet.service';
import { Tweet } from '@/tweet/entity/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetResolver, TweetService],
  controllers: [],
  exports: [],
})
export class TweetModule {}
