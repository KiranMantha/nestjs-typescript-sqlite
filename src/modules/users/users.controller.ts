import { User } from '@entities/user';
import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async index(@Res() response: Response) {
    const records = await this.usersService.findAll();
    return response.status(200).send({ data: records });
  }

  @Post()
  async create(@Body() record: User, @Res() response: Response) {
    await this.usersService.create(record);
    return response.status(200).send();
  }

  @Put()
  async update(@Body() record: User, @Res() response: Response) {
    await this.usersService.update(record);
    return response.status(200).send();
  }
}
