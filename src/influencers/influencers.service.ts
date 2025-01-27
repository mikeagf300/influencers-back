import { Injectable } from '@nestjs/common';

@Injectable()
export class InfluencersService {
  findAll() {
    return [{ name: 'Example Influencer', platform: 'Twitter', followers: 5000 }];
  }
}
