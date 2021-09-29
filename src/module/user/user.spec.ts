import { User } from '@src/entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
