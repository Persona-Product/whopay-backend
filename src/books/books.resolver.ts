import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book';
import { BooksService } from './books.service';
import { InputBookDto } from './dto/InputBook.dto';

@Resolver((of) => Book)
export class BooksResolver {
  // 利用する Service が inject される
  // （BooksServiceはBooksResolverに依存する）
  constructor(private booksService: BooksService) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  @Query((returns) => [Book]) // このクエリーは[Book]を返す
  books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  // 💁‍♂️ 単レコード取得
  @Query((returns) => Book) // このクエリーはBookを返す
  async getBook(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = await this.booksService.findOneById(id);

    // レコードが見つからなかったら404
    if (!book) {
      throw new NotFoundException(id);
    }

    return book;
  }

  // ✨ レコード追加・更新
  @Mutation((returns) => Book) // このクエリーはBookを返す
  addBook(@Args('newBook') newBook: InputBookDto): Promise<Book> {
    return this.booksService.create(newBook);
  }

  // 🔥 レコード削除
  @Mutation((returns) => Boolean) // このクエリーはBooleanを返す
  async removeBook(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }
}

// Resolverはルーティングのロジックを記述
// Resolverを使用するためには、Moduleへと登録しないといけない

// ResolverはRESTだとコントローラーと同じ記述する
// RESTで構成する場合との違い(GraphQL → REST)
// @Resolver → @Controller()
// @Query() → @Get()
// @Mutation() → @Post(), @Patch(), @Delete()
// @Args() → @Body()
