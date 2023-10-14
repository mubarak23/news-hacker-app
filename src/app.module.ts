import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HackerNewsModule } from './hacker-news/hacker-news.module';

@Module({
  imports: [HackerNewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
