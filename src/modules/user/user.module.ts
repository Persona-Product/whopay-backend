import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entity/user.entity';
import { UserResolver } from '@/user/user.resolver';
import { UserService } from '@/user/user.service';
import { Tweet } from '@/tweet/entity/tweet.entity';
import { TweetResolver } from '@/tweet/tweet.resolver';
import { TweetService } from '@/tweet/tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tweet])],
  providers: [UserResolver, UserService, TweetResolver, TweetService],
  controllers: [],
  exports: [],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
