import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User } from '@/user/entity/user.entity';
import { Tweet } from '@/tweet/entity/tweet.entity';
import { UserService } from '@/user/user.service';
import { TweetService } from '@/tweet/tweet.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@Resolver((of) => User)
export class UserResolver {
  // 利用する Service が inject される
  // （UserServiceはUserResolverに依存する）
  constructor(
    private userService: UserService,
    private tweetService: TweetService,
  ) {}

  // get all user
  @Query((returns) => [User])
  getAllUser() {
    return this.userService.getAllUser();
  }

  // get user
  @Query((returns) => User)
  getOneUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    const user = this.userService.getOneUser(userId);
    // レコードが見つからなかったら404
    if (!user) {
      throw new NotFoundException(userId);
    }
    return user;
  }

  @ResolveField(() => [Tweet])
  getUserTweet(@Parent() userId) {
    return this.tweetService.getUserTweet(userId);
  }

  // create user
  @Mutation((returns) => User)
  createUser(@Args('userDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // update user
  @Mutation((returns) => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('userDto') updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  // delete user
  @Mutation((returns) => Boolean)
  deleteUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.userService.deleteUser(userId);
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
