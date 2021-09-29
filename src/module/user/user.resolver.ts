import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User, Tweet, Like } from '@src/entity';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { TweetService } from '@tweet/tweet.service';
import { LikeService } from '@like/like.service';

@Resolver((of) => User)
export class UserResolver {
  // 利用する Service が inject される
  // （UserServiceはUserResolverに依存する）
  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private likeService: LikeService,
  ) {}

  // get all user
  @Query((returns) => [User])
  GetAllUser() {
    return this.userService.getAllUser();
  }

  // get user
  @Query((returns) => User)
  GetOneUser(@Args({ name: 'id', type: () => String }) id: string) {
    const user = this.userService.getOneUser(id);
    // レコードが見つからなかったら404
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @ResolveField(() => [Tweet])
  GetUserTweet(@Parent() user: User) {
    const { id } = user;
    return this.tweetService.getUserTweet(id);
  }

  @ResolveField(() => [Like])
  GetUserLike(@Parent() user: User) {
    const { id } = user;
    return this.likeService.getUserLike(id);
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
