import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowResolver } from '@/follow/follow.resolver';
import { FollowService } from '@/follow/follow.service';
import { Follow } from '@/follow/entity/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService, FollowResolver],
  controllers: [],
  exports: [],
})
export class FollowModule {}
