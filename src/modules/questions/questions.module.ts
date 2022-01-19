import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '@entities/question';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Questionnaire } from '@entities/questionnaire';
import { Category } from '@entities/category';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire, Category, Question])],
  controllers: [
    QuestionnaireController,
    CategoryController,
    QuestionsController
  ],
  providers: [QuestionnaireService, CategoryService, QuestionsService]
})
export class QuestionsModule {}
