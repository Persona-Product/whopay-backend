import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User } from '@/user/entity/user.entity';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@Resolver((of) => User)
export class UserResolver {
  // 利用する Service が inject される
  // （UserServiceはUserResolverに依存する）
  constructor(private userService: UserService) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  @Query((returns) => [User])
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  // 💁‍♂️ 単レコード取得
  @Query((returns) => User)
  getOneUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    const book = this.userService.getOneUser(userId);
    // レコードが見つからなかったら404
    if (!book) {
      throw new NotFoundException(userId);
    }
    return book;
  }

  // 🧩　レコード追加
  @Mutation((returns) => User)
  createUser(@Args('userDto') createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // ✨ レコード更新
  @Mutation((returns) => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('userDto') updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }

  // 🔥 レコード削除
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
