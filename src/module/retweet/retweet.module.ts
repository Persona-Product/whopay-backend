import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retweet, User } from '@src/entity';
import { RetweetResolver } from '@retweet/retweet.resolver';
import { RetweetService } from '@retweet/retweet.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Retweet, User]),
    forwardRef(() => UserModule),
  ],
  providers: [RetweetResolver, RetweetService],
  exports: [RetweetService],
})
export class RetweetModule {}
