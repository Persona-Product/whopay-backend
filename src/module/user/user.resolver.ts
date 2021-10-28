import { Controller } from '@nestjs/common';
import { UserService } from '@user/user.service';
// import { CreateUserDto } from '@user/dto/create-user.dto';
// import { UpdateUserDto } from '@user/dto/update-user.dto';

@Controller()
export class UserResolver {
  constructor(private userService: UserService) {}
}

// Resolverはルーティングのロジックを記述
// Resolverを使用するためには、Moduleへと登録しないといけない

// ResolverはRESTだとコントローラーと同じ記述する
// RESTで構成する場合との違い(GraphQL → REST)
// @Resolver → @Controller()
// @Query() → @Get()
// @Mutation() → @Post(), @Patch(), @Delete()
// @Args() → @Body()
