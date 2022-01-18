import { User } from '@entities/user';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() record: User): Promise<string> {
    await this.usersService.create(record);
    return 'User created successfully';
  }

  @Put()
  async update(@Body() record: User): Promise<string> {
    await this.usersService.update(record);
    return 'User saved successfully';
  }
}
