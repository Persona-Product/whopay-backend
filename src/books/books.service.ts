import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { InputBookDto } from './dto/InputBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 外部に依存性させる
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepostiory: Repository<Book>,
  ) {}

  // 👨‍👩‍👧‍👦 全レコード取得
  findAll(): Promise<Book[]> {
    return this.booksRepostiory.find();
  }

  // 💁‍♂️ 単レコード取得
  findOneById(id: number): Promise<Book> {
    return this.booksRepostiory.findOne(id);
  }

  // 🧩 レコード追加
  async create(data: InputBookDto): Promise<Book> {
    const book = this.booksRepostiory.create(data);
    await this.booksRepostiory.save(book);
    return book;
  }

  // ✨ レコード更新
  async update(id: number, data: InputBookDto): Promise<Book> {
    const book = await this.booksRepostiory.findOne(id);
    book.title = data.title;
    book.price = data.price;
    book.author = data.author;
    await this.booksRepostiory.save(book);
    return book;
  }

  // 🔥 レコード削除
  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepostiory.delete(id);
    return result.affected > 0;
  }
}

// Service(Provoder)は具体的なビジネスロジックを記述
// Controller or Resolver から、複雑なタスクを依頼される
// Service(Provoder)を使用するためには、Moduleへ登録しないといけない
