import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Follow, User } from '@src/entity';
import { FollowService } from '@follow/follow.service';
import { CreateFollowDto } from '@follow/dto/create-follow.dto';
import { UserService } from '@user/user.service';

@Resolver((of) => Follow)
export class FollowResolver {
  constructor(
    private followService: FollowService,
    private userService: UserService,
  ) {}

  // get follows
  // @Query(() => [Follow])
  // GetFollows() {
  //   return this.followService.getFollows();
  // }

  // get followings
  @Query(() => [Follow])
  GetFollowings(@Args({ name: 'id', type: () => String }) id: string) {
    return this.followService.getFollowingsByUser(id);
  }

  // get followers
  @Query(() => [Follow])
  GetFollowers(@Args({ name: 'id', type: () => String }) id: string) {
    return this.followService.getFollowersByUser(id);
  }

  // create follow
  @Mutation(() => Follow)
  CreateFollow(@Args('followDto') createFollowDto: CreateFollowDto) {
    return this.followService.createFollow(createFollowDto);
  }

  // // delete follow
  @Mutation(() => Boolean)
  DeleteFollow(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.followService.deleteFollow(id);
  }

  // get user by following
  @ResolveField(() => User)
  GetUserByFollowing(@Parent() follow: Follow) {
    const { userId } = follow;
    return this.userService.getUser(userId);
  }

  // get user by follower
  @ResolveField(() => User)
  GetUserByFollower(@Parent() follow: Follow) {
    const { followingUserId } = follow;
    return this.userService.getUser(followingUserId);
  }
}
