import { Controller, Get, Query } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('tweets')
  async getTweets(@Query('username') username: string) {
    if (!username) {
      return { message: 'Username is required' };
    }

    try {
        const tweets = await this.twitterService.getRecentTweetsByUser(username);
        return tweets;
      } catch (error) {
        return { error: error.message };
      }
  }
}
