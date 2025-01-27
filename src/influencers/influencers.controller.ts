//influencers.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InfluencersService } from './influencers.service';
import { Influencer } from './entities/influencer.entity';

@Controller('influencers')
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @Get()
  findAll() {
    return this.influencersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.influencersService.findOne(+id);
  }

  @Post()
  create(@Body() influencerData: Partial<Influencer>) {
    return this.influencersService.create(influencerData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Influencer>,
  ) {
    return this.influencersService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.influencersService.remove(+id);
  }
}

