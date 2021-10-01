import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Tweet, Like, Retweet, Comment, Follow } from '@src/entity';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { RetweetResolver } from '@retweet/retweet.resolver';
import { RetweetService } from '@retweet/retweet.service';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';
import { CommentResolver } from '@comment/comment.resolver';
import { CommentService } from '@comment/comment.service';
import { FollowResolver } from '@follow/follow.resolver';
import { FollowService } from '@follow/follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet, Retweet, Like, Comment, Follow]),
  ],
  providers: [
    UserResolver,
    UserService,
    TweetResolver,
    TweetService,
    RetweetResolver,
    RetweetService,
    LikeResolver,
    LikeService,
    CommentResolver,
    CommentService,
    FollowResolver,
    FollowService,
  ],
  controllers: [],
  exports: [],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
