import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HackerNewsService {
  constructor(private httpServive: HttpService) {}

  private async fetchStoryIds(endpoint: string): Promise<number[]> {
    try {
      const response = await lastValueFrom(
        this.httpServive
          .get(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`)
          .pipe(map((response) => response.data)),
      );

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch ${endpoint}: ${error.message}`);
    }
  }

  private async fetchStoryTitle(storyId: number): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpServive
          .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
          .pipe(map((response) => response.data)),
      );
      if (!response || !response.title) {
        throw new Error('Invalid or missing title in response');
      }
      return response.title;
    } catch (error) {
      throw new Error(`Failed to fetch story title: ${error.message}`);
    }
  }

  async getTopWords(storyIds: number[], count: number): Promise<string[]> {
    try {
      const storyTitles = await Promise.all(
        storyIds.map((storyId) => this.fetchStoryTitle(storyId)),
      );
      const words = storyTitles
        .join(' ')
        .toLocaleLowerCase()
        .match(/\b\w+\b/g);

      const topWords = _.chain(words)
        .countBy()
        .toPairs()
        .orderBy((pair) => pair[1], 'desc')
        .take(count)
        .map((pair) => pair[0])
        .value();

      return topWords;
    } catch (error) {
      throw new Error(`Failed to process story titles: ${error.message}`);
    }
  }

  async getTop25Words(): Promise<string[]> {
    const last25StoryIds = await this.fetchStoryIds('newstories');
    return this.getTopWords(last25StoryIds.slice(0, 25), 10);
  }

  async getLastWeekWords(): Promise<string[]> {
    const lastWeekStoryIds = await this.fetchStoryIds('newstories');

    // Filter story IDs created in the last week
    const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const lastWeekStoryIdsFiltered = lastWeekStoryIds.filter(
      (storyId) => storyId > oneWeekAgo,
    );
    return this.getTopWords(lastWeekStoryIdsFiltered, 10);
  }

  async getTop600Words(): Promise<string[]> {
    const top600StoryIds = await this.fetchStoryIds('topstories');
    return this.getTopWords(top600StoryIds.slice(0, 600), 10);
  }
}
