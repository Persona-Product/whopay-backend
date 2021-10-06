import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Tweet, Like, Retweet, Comment, Follow } from '@src/entity';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { TweetModule } from '@tweet/tweet.module';
import { RetweetModule } from '@retweet/retweet.module';
import { LikeModule } from '@like/like.module';
import { CommentModule } from '@comment/comment.module';
import { FollowModule } from '@follow/follow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet, Retweet, Like, Comment, Follow]),
    forwardRef(() => TweetModule),
    forwardRef(() => RetweetModule),
    forwardRef(() => LikeModule),
    forwardRef(() => CommentModule),
    forwardRef(() => FollowModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
