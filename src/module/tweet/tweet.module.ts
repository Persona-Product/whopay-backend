import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, User, Retweet, Like, Comment } from '@src/entity';
import { TweetResolver } from '@tweet/tweet.resolver';
import { TweetService } from '@tweet/tweet.service';
import { UserModule } from '@user/user.module';
import { RetweetModule } from '@retweet/retweet.module';
import { LikeModule } from '@like/like.module';
import { CommentModule } from '@comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tweet, User, Retweet, Like, Comment]),
    forwardRef(() => UserModule),
    RetweetModule,
    LikeModule,
    CommentModule,
  ],
  providers: [TweetResolver, TweetService],
  exports: [TweetService],
})
export class TweetModule {}
