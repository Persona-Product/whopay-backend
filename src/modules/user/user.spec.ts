import { User } from '@/modules/user/entity/user.entity';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
