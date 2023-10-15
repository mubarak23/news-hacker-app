import { ConfigProps } from './interfaces/config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  hackerNewsUrl:
    process.env.HACKER_NEWS_URL || 'https://hacker-news.firebaseio.com/v0',
});
