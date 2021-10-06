import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User, Tweet, Retweet, Like, Comment, Follow } from '@src/entity';
import { Count } from '@common/count/count';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { TweetService } from '@tweet/tweet.service';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';
import { FollowService } from '@follow/follow.service';
import { CountService } from '@common/count/count.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private retweetService: RetweetService,
    private likeService: LikeService,
    private commentService: CommentService,
    private followService: FollowService,
    private countService: CountService,
  ) {}

  // get users
  // @Query(() => [User])
  // GetUsers() {
  //   return this.userService.getUsers();
  // }

  // get user
  @Query(() => User)
  GetUser(@Args({ name: 'id', type: () => String }) id: string) {
    const user = this.userService.getUser(id);
    if (!user) throw new NotFoundException(id);
    return user;
  }

  // create user
  @Mutation(() => User)
  CreateUser(@Args('userDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // update user
  @Mutation(() => User)
  UpdateUser(
    @Args('id') id: string,
    @Args('userDto') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // delete user
  @Mutation(() => Boolean)
  DeleteUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.userService.deleteUser(id);
  }

  // get tweets by user
  @ResolveField(() => [Tweet])
  GetTweetsByUser(@Parent() user: User) {
    const { id } = user;
    return this.tweetService.getTweetsByUser(id);
  }

  // get retweets by user
  @ResolveField(() => [Retweet])
  GetRetweetsByUser(@Parent() user: User) {
    const { id } = user;
    return this.retweetService.getRetweetsByUser(id);
  }

  // get likes by user
  @ResolveField(() => [Like])
  GetLikesByUser(@Parent() user: User) {
    const { id } = user;
    return this.likeService.getLikesByUser(id);
  }

  // get comments by user
  @ResolveField(() => [Comment])
  GetCommentsByUser(@Parent() user: User) {
    const { id } = user;
    return this.commentService.getCommentsByUser(id);
  }

  // get followers by user
  @ResolveField(() => [Follow])
  GetFollowersByUser(@Parent() user: User) {
    const { id } = user;
    return this.followService.getFollowersByUser(id);
  }

  // get followings by user
  @ResolveField(() => [Follow])
  GetFollowingsByUser(@Parent() user: User) {
    const { id } = user;
    return this.followService.getFollowingsByUser(id);
  }

  // get folowing count by user
  @ResolveField(() => Count)
  GetFollowingCount(@Parent() user: User) {
    const { id } = user;
    return this.countService.getFollowingCount(id);
  }

  // get folower count by user
  @ResolveField(() => Count)
  GetFollowerCount(@Parent() user: User) {
    const { id } = user;
    return this.countService.getFollowerCount(id);
  }
}

// Resolverはルーティングのロジックを記述
// Resolverを使用するためには、Moduleへと登録しないといけない

// ResolverはRESTだとコントローラーと同じ記述する
// RESTで構成する場合との違い(GraphQL → REST)
// @Resolver → @Controller()
// @Query() → @Get()
// @Mutation() → @Post(), @Patch(), @Delete()
// @Args() → @Body()
