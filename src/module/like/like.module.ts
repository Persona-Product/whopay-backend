import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like, User, Tweet } from '@src/entity';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';
import { UserModule } from '@user/user.module';
import { TweetModule } from '@tweet/tweet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User, Tweet]),
    forwardRef(() => UserModule),
    forwardRef(() => TweetModule),
  ],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
