import { Questionnaire } from '@entities/questionnaire';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire) private repo: Repository<Questionnaire>
  ) {}

  async getAll(): Promise<Questionnaire[]> {
    //return await this.repo.find();
    return this.repo
      .createQueryBuilder('qTemp')
      .leftJoinAndSelect('qTemp.categories', 'cat')
      .addOrderBy('cat.sortId', 'ASC')
      .leftJoinAndSelect('cat.questions', 'qes')
      .getMany();
  }

  async getById(id: number): Promise<Questionnaire> {
    return this.repo
      .createQueryBuilder('qTemp')
      .whereInIds(id)
      .leftJoinAndSelect('qTemp.categories', 'cat')
      .addOrderBy('cat.sortId', 'ASC')
      .leftJoinAndSelect('cat.questions', 'qes')
      .getOne();
  }

  async create(record: Questionnaire): Promise<Questionnaire> {
    return await this.repo.save(record);
  }

  async update(record: Questionnaire): Promise<UpdateResult> {
    return await this.repo.update(record.id, record);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}
