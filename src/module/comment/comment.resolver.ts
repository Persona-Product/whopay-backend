import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Comment } from '@src/entity';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  // get comments
  @Query((returns) => [Comment])
  GetComments() {
    return this.commentService.getComments();
  }

  // get comment
  @Query((returns) => Comment)
  GetComment(@Args({ name: 'id', type: () => Int }) id: number) {
    const tweet = this.commentService.getComment(id);
    if (!tweet) throw new NotFoundException(id);
    return tweet;
  }

  // create comment
  @Mutation((returns) => Comment)
  CreateComment(@Args('tweetDto') createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  // // delete comment
  @Mutation((returns) => Boolean)
  DeleteComment(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.commentService.deleteComment(id);
  }
}
