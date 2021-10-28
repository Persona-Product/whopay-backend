import { Module } from '@nestjs/common';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
