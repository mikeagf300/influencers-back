import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterApi;

  constructor() {
    // Asegúrate de que las credenciales son correctas en tu archivo .env
    this.twitterClient = new TwitterApi({
      bearerToken: process.env.TWITTER_BEARER_TOKEN, // Usamos Bearer Token
      accessToken: process.env.TWITTER_ACCESS_TOKEN, // Usamos Access Token
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET, // Usamos Access Token Secret
    });
  }

  async getRecentTweetsByUser(username: string) {
    try {
      // Obtiene el usuario de Twitter
      const user = await this.twitterClient.v2.userByUsername(username);

      // Obtiene los últimos tweets del usuario
      const tweets = await this.twitterClient.v2.userTimeline(user.data.id, {
        max_results: 5, // El número de tweets que quieres obtener
      });

      return tweets.data;
    } catch (error) {
      console.error('Error fetching tweets from Twitter:', error);
      throw new Error('Unable to fetch tweets from Twitter.');
    }
  }
}
