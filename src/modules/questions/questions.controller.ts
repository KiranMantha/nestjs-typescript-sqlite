import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { Question } from '@entities/question';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Get()
  async index(): Promise<Question[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return await this.service.find(id);
  }

  @Post()
  async create(
    @Body() question: Question
  ): Promise<{ message: string; id: number }> {
    const item = await this.service.createOrUpdate(question);
    return { message: 'Question created successfully', id: item.id };
  }

  @Put()
  async update(
    @Body() question: Question
  ): Promise<{ message: string; id: number }> {
    const item = await this.service.createOrUpdate(question);
    return { message: 'Question created successfully', id: item.id };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string; id: number }> {
    await this.service.delete(id);
    return { message: 'Question created successfully', id };
  }
}
