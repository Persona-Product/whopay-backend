import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retweet, Tweet, User } from '@src/entity';
import { RetweetResolver } from '@retweet/retweet.resolver';
import { RetweetService } from '@retweet/retweet.service';
import { UserModule } from '@user/user.module';
import { TweetModule } from '@tweet/tweet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Retweet, User, Tweet]),
    forwardRef(() => UserModule),
    forwardRef(() => TweetModule),
  ],
  providers: [RetweetResolver, RetweetService],
  exports: [RetweetService],
})
export class RetweetModule {}
