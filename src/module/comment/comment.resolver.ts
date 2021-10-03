import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Comment, User } from '@src/entity';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { UserService } from '@user/user.service';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  // get comments
  @Query(() => [Comment])
  GetComments() {
    return this.commentService.getComments();
  }

  // get comment
  @Query(() => Comment)
  GetComment(@Args({ name: 'id', type: () => Int }) id: number) {
    const tweet = this.commentService.getComment(id);
    if (!tweet) throw new NotFoundException(id);
    return tweet;
  }

  // create comment
  @Mutation(() => Comment)
  CreateComment(@Args('tweetDto') createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  // // delete comment
  @Mutation(() => Boolean)
  DeleteComment(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.commentService.deleteComment(id);
  }

  // get user by comment
  @ResolveField(() => User)
  GetUserByComment(@Parent() comment: Comment) {
    const { userId } = comment;
    return this.userService.getUser(userId);
  }
}
