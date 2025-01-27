//influencers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfluencersService } from './influencers.service';
import { InfluencersController } from './influencers.controller';
import { Influencer } from './entities/influencer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Influencer])],
  providers: [InfluencersService],
  controllers: [InfluencersController],
})
export class InfluencersModule {}

