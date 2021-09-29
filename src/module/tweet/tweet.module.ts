import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Like } from '@src/entity';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Like])],
  providers: [TweetResolver, TweetService, LikeResolver, LikeService],
  controllers: [],
  exports: [],
})
export class TweetModule {}
