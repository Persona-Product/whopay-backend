import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Comment } from '@src/entity';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  // get all user, all tweet
  @Query((returns) => [Comment])
  GetAllComment() {
    return this.commentService.getAllComment();
  }

  // get tweet
  @Query((returns) => Comment)
  GetOneComment(@Args({ name: 'id', type: () => Int }) id: number) {
    const tweet = this.commentService.getOneComment(id);
    if (!tweet) throw new NotFoundException(id);
    return tweet;
  }

  // create tweet
  @Mutation((returns) => Comment)
  CreateComment(@Args('tweetDto') createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  // // delete tweet
  @Mutation((returns) => Boolean)
  DeleteComment(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.commentService.deleteComment(id);
  }
}
