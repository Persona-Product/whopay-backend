import { Test, TestingModule } from '@nestjs/testing';
import { RetweetResolver } from '@/retweet/retweet.resolver';

describe('RetweetResolver', () => {
  let resolver: RetweetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetweetResolver],
    }).compile();

    resolver = module.get<RetweetResolver>(RetweetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
