import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeResolver } from '@/modules/like/like.resolver';
import { LikeService } from '@/modules/like/like.service';
import { Like } from '@/modules/like/entity/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeResolver, LikeService],
  controllers: [],
  exports: [],
})
export class LikeModule {}
