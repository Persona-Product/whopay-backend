import { Book } from './entity/book.entity';

describe('Book', () => {
  it('should be defined', () => {
    expect(new Book()).toBeDefined();
  });
});
