import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersResolver, UsersService],
  exports: [],
})
export class UsersModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
