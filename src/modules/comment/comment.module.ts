import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentResolver } from '@/comment/comment.resolver';
import { CommentService } from '@/comment/comment.service';
import { Comment } from '@/comment/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentResolver, CommentService],
  controllers: [],
  exports: [],
})
export class CommentModule {}
