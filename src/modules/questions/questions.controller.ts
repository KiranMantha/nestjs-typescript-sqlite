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
  constructor(private questionnaireService: QuestionsService) {}

  @Get()
  async index(): Promise<Question[]> {
    return await this.questionnaireService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return await this.questionnaireService.find(id);
  }

  @Post()
  async create(@Body() question: Question): Promise<Question> {
    return await this.questionnaireService.create(question);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() question: Question
  ): Promise<any> {
    question.id = id;
    return await this.questionnaireService.update(question);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.questionnaireService.delete(id);
  }
}
