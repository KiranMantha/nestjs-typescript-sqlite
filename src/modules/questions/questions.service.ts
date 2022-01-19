import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Question } from '@entities/question';
import { Category } from '@entities/category';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.repo.find();
  }

  async find(id: number): Promise<Question> {
    return await this.repo.findOne(id);
  }

  async createOrUpdate(question: Question): Promise<Question> {
    const categoryId = (question as any).categoryId;
    const category = await this.categoryRepo.findOne(categoryId);
    question.category = category;
    return await this.repo.save(question);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
