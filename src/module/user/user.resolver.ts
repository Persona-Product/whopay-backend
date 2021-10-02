import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User, Tweet, Like, Comment } from '@src/entity';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { TweetService } from '@tweet/tweet.service';
import { RetweetService } from '@retweet/retweet.service';
import { LikeService } from '@like/like.service';
import { CommentService } from '@comment/comment.service';
import { FollowService } from '@follow/follow.service';

@Resolver((of) => User)
export class UserResolver {
  // 利用する Service が inject される
  // （UserServiceはUserResolverに依存する）
  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private retweetService: RetweetService,
    private likeService: LikeService,
    private commentService: CommentService,
    private followeService: FollowService,
  ) {}

  // get users
  @Query((returns) => [User])
  GetUsers() {
    return this.userService.getUsers();
  }

  // get user
  @Query((returns) => User)
  GetUser(@Args({ name: 'id', type: () => String }) id: string) {
    const user = this.userService.getUser(id);
    if (!user) throw new NotFoundException(id);
    return user;
  }

  // get tweets by user
  @ResolveField(() => [Tweet])
  GetTweetsByUser(@Parent() user: User) {
    const { id } = user;
    return this.tweetService.getTweetsByUser(id);
  }

  // get retweets by user
  @ResolveField(() => [Tweet])
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

  // get folowing count on user
  @ResolveField(() => [Comment])
  GetFollowingCount(@Parent() user: User) {
    const { id } = user;
    return this.followeService.getFollowingCount(id);
  }

  // get folower count on user
  @ResolveField(() => [Comment])
  GetFollowerCount(@Parent() user: User) {
    const { id } = user;
    return this.followeService.getFollowerCount(id);
  }

  // create user
  @Mutation((returns) => User)
  CreateUser(@Args('userDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // update user
  @Mutation((returns) => User)
  UpdateUser(
    @Args('id') id: string,
    @Args('userDto') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // delete user
  @Mutation((returns) => Boolean)
  DeleteUser(@Args({ name: 'id', type: () => String }) id: string) {
    return this.userService.deleteUser(id);
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
