import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Tweet, User } from '@src/entity';
import { CommentResolver } from '@comment/comment.resolver';
import { CommentService } from '@comment/comment.service';
import { UserModule } from '@user/user.module';
import { TweetModule } from '@tweet/tweet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Tweet]),
    forwardRef(() => UserModule),
    forwardRef(() => TweetModule),
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
