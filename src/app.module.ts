import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';
import { TweetModule } from '@tweet/tweet.module';
import { RetweetModule } from '@retweet/retweet.module';
import { CommentModule } from '@comment/comment.module';
import { LikeModule } from '@like/like.module';
import { FollowModule } from '@follow/follow.module';

@Module({
  imports: [
    CoreModule,
    CommonModule,
    UserModule,
    TweetModule,
    RetweetModule,
    CommentModule,
    LikeModule,
    FollowModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
