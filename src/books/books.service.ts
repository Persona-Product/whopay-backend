import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { InputBookDto } from './dto/InputBook.dto';

// データベースの代替
let books = [
  {
    id: 1,
    title: 'test 1',
    author: 'Joe',
    price: 1000,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'test 2',
    author: 'Maria',
    price: 2000,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'test 3',
    author: 'Smith',
    price: 3000,
    createdAt: new Date(),
  },
] as Book[];

// 外部に依存性させる
@Injectable()
export class BooksService {
  // 👨‍👩‍👧‍👦 全レコード取得
  findAll(): Promise<Book[]> {
    return Promise.resolve(books);
  }

  // 💁‍♂️ 単レコード取得
  findOneById(id: number): Promise<Book> {
    const book = books.find((book) => book.id === id);
    return Promise.resolve(book);
  }

  // ✨ レコード追加・更新
  create(data: InputBookDto): Promise<Book> {
    const book: Book = {
      id: Date.now(),
      title: data.title,
      price: data.price,
      author: data.author,
      createdAt: new Date(),
    };

    books.push(book);

    return Promise.resolve(book);
  }

  // 🔥 レコード削除
  async remove(id: number): Promise<boolean> {
    books = books.filter((book) => book.id !== id);
    return true;
  }
}

// Service(Provoder)は具体的なビジネスロジックを記述
// Controller or Resolver から、複雑なタスクを依頼される
// Service(Provoder)を使用するためには、Moduleへ登録しないといけない
