import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/config';
import { HackerNewsModule } from './hacker-news/hacker-news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    HackerNewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
