import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Tweet, Like } from '@src/entity';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet, Like])],
  providers: [
    UserResolver,
    UserService,
    TweetResolver,
    TweetService,
    LikeResolver,
    LikeService,
  ],
  controllers: [],
  exports: [],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
