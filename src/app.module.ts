import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book';

@Module({
  imports: [
    // graphqlのモジュールをアプリ全体に依存性注入
    GraphQLModule.forRoot({
      // DTOを検知して、スキーマ自動生成
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'miyashota',
      password: '0301',
      database: 'nesttodo',
      entities: [Book],
      synchronize: true,
    }),
    // （BooksModuleはAppModuleに依存する）
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
