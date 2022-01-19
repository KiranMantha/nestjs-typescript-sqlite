import { Category } from '@entities/category';
import { Questionnaire } from '@entities/questionnaire';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Questionnaire)
    private questionnaireRepo: Repository<Questionnaire>
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async create(record: Category): Promise<Category> {
    const { name, sortId } = record;
    const questionnaireId = (record as any).questionnaireId;
    const questionnaire = await this.questionnaireRepo.findOne(questionnaireId);
    const category = this.categoryRepo.create({
      name,
      sortId,
      questionnaire
    });
    return await this.categoryRepo.save(category);
  }

  async update(record: Category) {
    const questionnaireId = (record as any).questionnaireId;
    const questionnaire = await this.questionnaireRepo.findOne(questionnaireId);
    record.questionnaire = questionnaire;
    return await this.categoryRepo.save(record);
  }
}
