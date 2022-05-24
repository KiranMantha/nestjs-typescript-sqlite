import { Questionnaire } from '@entities/questionnaire';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private service: QuestionnaireService) {}

  @Get()
  async index(): Promise<Questionnaire[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Questionnaire> {
    return await this.service.getById(id);
  }

  @Post()
  async create(
    @Body() record: Questionnaire
  ): Promise<{ message: string; id: number }> {
    const item = await this.service.create(record);
    return { message: 'Questionnaire created successfully', id: item.id };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string; id: number }> {
    await this.service.delete(id);
    return { message: 'Questionnaire deleted successfully', id };
  }
}
