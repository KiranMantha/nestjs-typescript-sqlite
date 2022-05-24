import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '@entities/question';
import { Questionnaire } from '@entities/questionnaire';
import { Category } from '@entities/category';
import { QuestionsService } from './questions.service';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire, Category, Question])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, CategoryService, QuestionsService]
})
export class QuestionsModule {}
