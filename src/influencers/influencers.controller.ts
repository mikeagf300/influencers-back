import { Controller, Get } from '@nestjs/common';
import { InfluencersService } from './influencers.service';

@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @Get()
  findAll() {
    return this.influencersService.findAll();
  }
}
