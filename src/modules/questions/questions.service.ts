import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Question } from '@entities/question';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionnaireRepository: Repository<Question>
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.questionnaireRepository.find();
  }

  async find(id: number): Promise<Question> {
    return await this.questionnaireRepository.findOne(id);
  }

  async create(question: Question): Promise<Question> {
    return await this.questionnaireRepository.save(question);
  }

  async update(question: Question): Promise<UpdateResult> {
    return await this.questionnaireRepository.update(question.id, question);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.questionnaireRepository.delete(id);
  }
}
