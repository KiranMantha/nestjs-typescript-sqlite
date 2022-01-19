import { Category } from '@entities/category';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Get()
  async index(): Promise<Category[]> {
    return await this.service.getAll();
  }

  @Post()
  async create(
    @Body() record: Category
  ): Promise<{ message: string; id: number }> {
    const item = await this.service.create(record);
    return { message: 'Category created successfully', id: item.id };
  }

  @Put()
  async update(
    @Body() record: Category
  ): Promise<{ message: string; id: number }> {
    const item = await this.service.update(record);
    return { message: 'Category created successfully', id: item.id };
  }
}
