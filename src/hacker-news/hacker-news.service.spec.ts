import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackerNewsService],
    }).compile();

    service = module.get<HackerNewsService>(HackerNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the top 25 words', async () => {
    const top25Words = await service.getTop25Words();
    expect(top25Words).toHaveLength(25);
  });

  it('should get the last week words', async () => {
    const lastWeekWords = await service.getLastWeekWords();

    expect(lastWeekWords).toHaveLength(10);
  });

  it('should get the top 600 words', async () => {
    const top600Words = await service.getTop600Words();

    expect(top600Words).toHaveLength(10);
  });
});
