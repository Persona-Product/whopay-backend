import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Tweet, Like, Retweet, Comment, Follow } from '@src/entity';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { TweetService } from '@tweet/tweet.service';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';
import { FollowService } from '@follow/follow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet, Retweet, Like, Comment, Follow]),
  ],
  providers: [
    UserResolver,
    UserService,
    TweetService,
    RetweetService,
    LikeService,
    CommentService,
    FollowService,
  ],
  controllers: [],
  exports: [],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
