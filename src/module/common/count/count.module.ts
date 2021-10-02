import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retweet, Like, Comment, Follow } from '@src/entity';
import { CountResolver } from '@common/count/count.resolver';
import { CountService } from '@common/count/count.service';

@Module({
  imports: [TypeOrmModule.forFeature([Retweet, Like, Comment, Follow])],
  providers: [CountResolver, CountService],
  exports: [CountService],
})
export class CountModule {}
