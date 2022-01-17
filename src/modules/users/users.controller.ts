import { User } from '@entities/user';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async index(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
