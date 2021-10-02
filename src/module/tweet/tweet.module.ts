import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Retweet, Like, Comment } from '@src/entity';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, Retweet, Like, Comment])],
  providers: [
    TweetResolver,
    TweetService,
    RetweetService,
    LikeService,
    CommentService,
  ],
  controllers: [],
  exports: [],
})
export class TweetModule {}
