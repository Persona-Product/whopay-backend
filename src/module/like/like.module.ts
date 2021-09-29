import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '@src/entity';
import { LikeResolver } from '@like/like.resolver';
import { LikeService } from '@like/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeResolver, LikeService],
  controllers: [],
  exports: [],
})
export class LikeModule {}
