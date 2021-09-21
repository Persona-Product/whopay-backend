import { Test, TestingModule } from '@nestjs/testing';
import { RetweetService } from '@/retweet/retweet.service';

describe('RetweetService', () => {
  let service: RetweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetweetService],
    }).compile();

    service = module.get<RetweetService>(RetweetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
