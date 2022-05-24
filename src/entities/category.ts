import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from './question';
import { Questionnaire } from './questionnaire';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sortId: number;

  @Column()
  questionnaireId: number;

  @ManyToOne(() => Questionnaire)
  questionnaire: Questionnaire;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];

  @CreateDateColumn()
  createdDate: string;
}
