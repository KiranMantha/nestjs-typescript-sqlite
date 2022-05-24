import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Category } from './category';

@Entity('questionnaire')
export class Questionnaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Category, (category) => category.questionnaire)
  categories: Category[];

  @CreateDateColumn()
  createdDate: string;
}
