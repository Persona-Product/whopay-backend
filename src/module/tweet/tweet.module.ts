import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Retweet, Like, Comment } from '@src/entity';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { RetweetResolver } from '@retweet/retweet.resolver';
import { RetweetService } from '@retweet/retweet.service';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';
import { CommentResolver } from '@comment/comment.resolver';
import { CommentService } from '@comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Retweet, Like, Comment])],
  providers: [
    TweetResolver,
    TweetService,
    RetweetResolver,
    RetweetService,
    LikeResolver,
    LikeService,
    CommentResolver,
    CommentService,
  ],
  controllers: [],
  exports: [],
})
export class TweetModule {}
