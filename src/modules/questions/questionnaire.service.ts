import { Category } from '@entities/category';
import { Question } from '@entities/question';
import { Questionnaire } from '@entities/questionnaire';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { QuestionsService } from './questions.service';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire) private repo: Repository<Questionnaire>,
    private questionService: QuestionsService,
    private categoryService: CategoryService,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ) {}

  async getAll(): Promise<Questionnaire[]> {
    return this.repo
      .createQueryBuilder('qTemp')
      .orderBy('qTemp.id', 'DESC')
      .getMany();
  }

  async getById(id: number): Promise<Questionnaire> {
    const record = await this.repo
      .createQueryBuilder('qTemp')
      .whereInIds(id)
      .leftJoinAndSelect('qTemp.categories', 'cat')
      .addOrderBy('cat.sortId', 'ASC')
      .leftJoinAndSelect('cat.questions', 'qes')
      .addOrderBy('qes.sortId', 'ASC')
      .getOne();

    record.categories.forEach((category) => {
      category.questions.forEach((question) => {
        question.options &&
          ((question as any).options = JSON.parse(question.options));
      });
    });

    return record;
  }

  async create(record: Questionnaire): Promise<Questionnaire> {
    const questionnaire = await this.repo.save({ title: record.title });
    record.categories.forEach(async (category) => {
      delete category.id;
      category.questionnaireId = questionnaire.id;
      const newCategory = await this.categoryService.create(category);
      const questions: Question[] = category.questions.map((question) => {
        delete question.id;
        const optionsStr = JSON.stringify(question.options);
        console.log(`options: ${optionsStr}`);
        question.categoryId = newCategory.id;
        question.options = optionsStr;
        return question;
      });
      return this.questionRepo
        .createQueryBuilder()
        .insert()
        .into(Question)
        .values(questions)
        .execute();
    });
    return questionnaire;
  }

  async delete(id: number): Promise<DeleteResult> {
    const questionnaire = await this.getById(id);
    const categoryIds = [];

    questionnaire.categories.forEach(async (category) => {
      const qids = category.questions.reduce((acc, question) => {
        acc.push(question.id);
        return acc;
      }, []);

      categoryIds.push(category.id);
      await this.questionRepo.delete(qids);
    });
    await this.categoryRepo.delete(categoryIds);
    return await this.repo.delete(id);
  }
}
