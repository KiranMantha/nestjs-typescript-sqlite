import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Question } from './question';
import { Questionnaire } from './questionnaire';

@Entity('category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  @Column()
  sortId: number;

  @ManyToOne(() => Questionnaire)
  questionnaire: Questionnaire;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];

  @CreateDateColumn()
  createdDate: string;

  @UpdateDateColumn()
  lastModifiedDate: string;
}
