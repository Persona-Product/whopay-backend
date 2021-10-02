import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Like, User } from '@src/entity';
import { LikeService } from '@like/like.service';
import { CreateLikeDto } from '@like/dto/create-like.dto';
// import { UserService } from '@user/user.service';

@Resolver((of) => Like)
export class LikeResolver {
  constructor(
    private likeService: LikeService, // private userService: UserService,
  ) {}

  // get likes
  @Query((returns) => [Like])
  GetLikes() {
    return this.likeService.getLikes();
  }

  // get user by user
  // @ResolveField(() => [User])
  // GetRetweetsByUser(@Parent() like: Like) {
  //   const { userId } = like;
  //   return this.userService.getUser(userId);
  // }

  // create like
  @Mutation((returns) => Like)
  CreateLike(@Args('likeDto') createLikeDto: CreateLikeDto) {
    return this.likeService.createLike(createLikeDto);
  }

  // // delete like
  @Mutation((returns) => Boolean)
  DeleteLike(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.likeService.deleteLike(id);
  }
}
