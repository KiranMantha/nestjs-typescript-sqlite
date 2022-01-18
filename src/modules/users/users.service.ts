import { Profile } from '@entities/profile';
import { User } from '@entities/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(record: User): Promise<User> {
    const profileId = (record as any).profile_id;
    const profile = await this.profilesRepository.findOne(profileId);
    const user = this.usersRepository.create({
      ...record,
      profile
    });
    return await this.usersRepository.save(user);
  }

  async update(record: User): Promise<User> {
    const profileId = (record as any).profile_id;
    const profile = await this.profilesRepository.findOne(profileId);
    record.profile = profile;
    return await this.usersRepository.save(record);
  }
}
