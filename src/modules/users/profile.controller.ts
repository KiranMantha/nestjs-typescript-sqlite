import { Profile } from '@entities/profile';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfilesService } from './profile.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @Get()
  async index(): Promise<Profile[]> {
    return await this.profilesService.findAll();
  }

  @Post()
  async create(@Body() profile: Profile): Promise<Profile> {
    return await this.profilesService.create(profile);
  }
}
