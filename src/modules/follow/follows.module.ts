import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowResolver } from '@/modules/follow/follow.resolver';
import { FollowService } from '@/modules/follow/follow.service';
import { Follow } from '@/modules/follow/entity/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService, FollowResolver],
})
export class FollowModule {}
