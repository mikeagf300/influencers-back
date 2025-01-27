//influences.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Influencer } from './entities/influencer.entity';

@Injectable()
export class InfluencersService {
  constructor(
    @InjectRepository(Influencer)
    private readonly influencerRepository: Repository<Influencer>,
  ) {}

  async findAll() {
    return this.influencerRepository.find();
  }

  async findOne(id: number) {
    return this.influencerRepository.findOne({ where: { id } });
  }

  async create(influencerData: Partial<Influencer>) {
    const influencer = this.influencerRepository.create(influencerData);
    return this.influencerRepository.save(influencer);
  }

  async update(id: number, updateData: Partial<Influencer>) {
    await this.influencerRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const influencer = await this.findOne(id);
    if (influencer) {
      await this.influencerRepository.delete(id);
      return { message: `Influencer with id ${id} removed successfully.` };
    }
    return { message: `Influencer with id ${id} not found.` };
  }
}
