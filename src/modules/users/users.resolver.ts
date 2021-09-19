import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { InputUserDto } from './dto/input-user.dto';

@Resolver((of) => User)
export class UsersResolver {
  // 利用する Service が inject される
  // （UsersServiceはUsersResolverに依存する）
  constructor(private usersService: UsersService) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  @Query((returns) => [User])
  getAllUser(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  // 💁‍♂️ 単レコード取得
  @Query((returns) => User)
  getOneUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    const book = this.usersService.getOneUser(userId);
    // レコードが見つからなかったら404
    if (!book) {
      throw new NotFoundException(userId);
    }
    return book;
  }

  // 🧩　レコード追加
  @Mutation((returns) => User)
  createUser(@Args('userDto') userDto: InputUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  // ✨ レコード更新
  @Mutation((returns) => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('userDto') userDto: InputUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, userDto);
  }

  // 🔥 レコード削除
  @Mutation((returns) => Boolean)
  deleteUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.usersService.deleteUser(userId);
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
