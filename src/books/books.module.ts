import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [],
  providers: [BooksResolver, BooksService],
  exports: [],
})
export class BooksModule {}

// 特定の役割に応じて一つの Module が構成されるべきである
// @Global() デコレータを適用した Module は、グローバルに利用可能となる
