import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeResolver } from '@/like/like.resolver';
import { LikeService } from '@/like/like.service';
import { Like } from '@/like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeResolver, LikeService],
  controllers: [],
  exports: [],
})
export class LikeModule {}
