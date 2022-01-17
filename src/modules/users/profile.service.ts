import { Profile } from '@entities/profile';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<Profile[]> {
    return await this.profilesRepository.find();
  }

  async create(profile: Profile): Promise<Profile> {
    const _profile = new Profile();
    _profile.name = profile.name;
    return await this.profilesRepository.save(_profile);
  }
}
