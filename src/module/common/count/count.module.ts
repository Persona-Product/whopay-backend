import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Retweet, Like, Comment, Follow } from '@src/entity';
import { CountService } from '@common/count/count.service';

@Module({
  imports: [TypeOrmModule.forFeature([Retweet, Like, Comment, Follow])],
  providers: [CountService],
  exports: [CountService],
})
export class CountModule {}
