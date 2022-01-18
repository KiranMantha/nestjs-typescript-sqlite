import { Profile } from '@entities/profile';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProfilesService } from './profile.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @Get()
  async index(@Res() response: Response) {
    const records = await this.profilesService.findAll();
    return response.status(200).send({ data: records });
  }

  @Post()
  async create(@Body() profile: Profile, @Res() response: Response) {
    await this.profilesService.create(profile);
    return response.status(200);
  }
}
