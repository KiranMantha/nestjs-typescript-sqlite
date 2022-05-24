import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { Category } from './category';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  question: string;

  @Column()
  questionType: string;

  @Column()
  definition: string;

  @Column()
  recommendation: string;

  @Column()
  priority: string;

  @Column()
  reviewGate: string;

  @Column()
  sortId: number;

  @Column()
  categoryId: number;

  @Column({
    default: '[]'
  })
  options: string;

  @ManyToOne(() => Category, (category) => category.questions)
  category: Category;

  @CreateDateColumn()
  createdDate: Date;
}
