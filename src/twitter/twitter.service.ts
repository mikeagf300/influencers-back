import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterApi;

  constructor() {
    // Inicializamos el cliente con el Bearer Token
    this.twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || '');
  }

  async getRecentTweetsByUser(username: string) {
    try {
      // Obtiene información del usuario por nombre de usuario
      const user = await this.twitterClient.v2.userByUsername(username);

      // Obtiene la línea de tiempo del usuario (tweets recientes)
      const tweets = await this.twitterClient.v2.userTimeline(user.data.id, {
        max_results: 5, // Define cuántos tweets quieres obtener
        'tweet.fields': ['created_at', 'text'], // Campos adicionales para incluir
      });

      return tweets.data;
    } catch (error) {
      console.error('Error fetching tweets from Twitter:', error);
      throw new Error('Unable to fetch tweets from Twitter.');
    }
  }
}
