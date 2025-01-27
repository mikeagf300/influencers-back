import { Module } from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { InfluencersController } from './influencers.controller';

@Module({
  providers: [InfluencersService],
  controllers: [InfluencersController]
})
export class InfluencersModule {}
