import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // graphqlのモジュールをアプリ全体に依存性注入
    GraphQLModule.forRoot({
      // Dtoを検知して、スキーマ自動生成
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    // （BooksModuleはAppModuleに依存する）
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
