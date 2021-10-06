import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow, User } from '@src/entity';
import { FollowResolver } from '@follow/follow.resolver';
import { FollowService } from '@follow/follow.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow, User]),
    forwardRef(() => UserModule),
  ],
  providers: [FollowResolver, FollowService],
  exports: [FollowService],
})
export class FollowModule {}
