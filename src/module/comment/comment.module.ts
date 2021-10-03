import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, User } from '@src/entity';
import { CommentResolver } from '@comment/comment.resolver';
import { CommentService } from '@comment/comment.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User]),
    forwardRef(() => UserModule),
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
