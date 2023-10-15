import { Controller, Get } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';

@Controller('hacker-news')
export class HackerNewsController {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  @Get('top-25-words')
  async getTop25Words(): Promise<string[]> {
    const topWords = await this.hackerNewsService.getTop25Words();
    return topWords;
  }

  @Get('last-week-words')
  async getLastWeekWords(): Promise<string[]> {
    const lastWeekWords = await this.hackerNewsService.getLastWeekWords();
    return lastWeekWords;
  }

  @Get('top-600-words')
  async getTop600Words(): Promise<string[]> {
    const top600Words = await this.hackerNewsService.getTop600Words();
    return top600Words;
  }
}
