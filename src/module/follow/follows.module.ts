import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '@src/entity';
import { FollowResolver } from '@follow/follow.resolver';
import { FollowService } from '@follow/follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService, FollowResolver],
  controllers: [],
  exports: [],
})
export class FollowModule {}
