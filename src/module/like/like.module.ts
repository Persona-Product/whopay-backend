import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like, User } from '@src/entity';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User]),
    forwardRef(() => UserModule),
  ],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
