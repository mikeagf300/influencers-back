//influencers.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { InfluencersService } from './influencers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Influencer } from './entities/influencer.entity';
import { Repository } from 'typeorm';

describe('InfluencersService', () => {
  let service: InfluencersService;
  let repo: Repository<Influencer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InfluencersService,
        {
          provide: getRepositoryToken(Influencer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<InfluencersService>(InfluencersService);
    repo = module.get<Repository<Influencer>>(getRepositoryToken(Influencer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all influencers', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });
});

